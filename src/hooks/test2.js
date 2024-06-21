import { useState } from 'react';

// Filter out non fetch requests from strings due to bad data:
  function separateUrls(urlArray) {
    const validUrls = urlArray.filter(url => typeof url === 'string' && url.startsWith('https'));
    const invalidUrls = urlArray.filter(url => typeof url === 'string' && !url.startsWith('https'));

    return { validUrls, invalidUrls };
}

  

export default function useCharacterDataFetcher() {
    const [showNames, setShowNames] = useState({});
    const [characterData, setCharacterData] = useState({ current: [], former: [], notable: [] });

    async function fetchData(urlData, cardId, charType) {
        let urlArr = Array.isArray(urlData) ? urlData : urlData.split(",");
        const { validUrls, invalidUrls } = separateUrls(urlArr);
        console.log("Valid URLs:", validUrls, "Invalid URLs:", invalidUrls);
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