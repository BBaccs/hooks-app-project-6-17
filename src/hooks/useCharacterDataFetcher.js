import { useState } from 'react';

export default function useCharacterDataFetcher() {
    const [showNames, setShowNames] = useState({});
    const [characterData, setCharacterData] = useState({ current: [], former: [], notable: [] });

    async function fetchData(urlData, cardId, charType) {
        let urlArr = Array.isArray(urlData) ? urlData : urlData.split(",");
        try {
            const promises = urlArr.map(url => fetch(url).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            }));
            const results = await Promise.all(promises);
            if (charType === 'current') {
                setCharacterData(prevProps => ({ ...prevProps, current: results, former: prevProps.former }));
            } else if (charType === 'former') {
                setCharacterData(prevProps => ({ ...prevProps, current: prevProps.current, former: results }));
            } else if (charType === 'notable') {
                // If charType is 'none', it will update both current and former
                setCharacterData(prevProps => ({ ...prevProps, current: prevProps.current, former: prevProps.current, notable: results }));
            }
            toggleShowNames(cardId);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setCharacterData([]);
        }
    };

    const toggleShowNames = (id) => {
        setShowNames(prevData => ({
            ...prevData,
            [id]: !prevData[id]
        }));
    };
    return { characterData, showNames, fetchData, toggleShowNames };
};