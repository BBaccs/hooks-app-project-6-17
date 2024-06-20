import { useState } from 'react';

export default function useCharacterDataFetcher() {
    // const [characterData, setCharacterData] = useState([]);
    const [showNames, setShowNames] = useState({});
    const [characterData, setCharacterData] = useState({ current: [], former: [] });

    async function fetchData(urlData, cardId, charType = 'none') {
        // console.log('chartype:', charType)
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
                setCharacterData({ current: [results], former: [] });
            }  if (charType === 'former') {
                setCharacterData({ current: [], former: [results] });
            } else if (!charType) {
                setCharacterData(results);
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