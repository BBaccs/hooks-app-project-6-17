import { useState } from 'react';

// Function to filter out non-fetch request strings due to bad data:
function separateUrls(urlArray) {
    const validUrlsArr = urlArray.filter(url => typeof url === 'string' && url.startsWith('https'));
    const invalidUrlsArr = urlArray.filter(url => typeof url === 'string' && !url.startsWith('https'));
    const invalidUrlObjArr = invalidUrlsArr.map(url => ({ name: url }));

    return { validUrlsArr, invalidUrlObjArr };
}



export default function useCharacterDataFetcher() {
    const [showNames, setShowNames] = useState({});
    const [characterData, setCharacterData] = useState({ current: [], former: [], notable: [] });

    async function fetchData(urlData, cardId, charType) {
        let urlArr = Array.isArray(urlData) ? urlData : urlData.split(",");
        const { validUrlsArr, invalidUrlObjArr } = separateUrls(urlArr);
        console.log("Valid URLs:", validUrlsArr, "Invalid URLs:", invalidUrlObjArr);
        try {
            const promises = validUrlsArr.map(url => fetch(url).then(response => {
                if (!response.ok) {
                    console.error('Network response was not ok: ' + + response.statusText);
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            }));
            let results = await Promise.all(promises);
            console.log('results:', results);
            results = results.concat(invalidUrlObjArr);
            console.log(results);
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