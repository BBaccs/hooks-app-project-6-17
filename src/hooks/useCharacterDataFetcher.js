import { useState } from 'react';

export default function useCharacterDataFetcher() {
    const [showNames, setShowNames] = useState({});
    const [characterData, setCharacterData] = useState({ current: [], former: [], notable: [] });

    async function fetchData(urlData, cardId, charType) {
        // Ensure urlData is an array, and filter out any item that doesn't start with 'http'
        let urlArr = Array.isArray(urlData) ? urlData : urlData.split(",");
        urlArr = urlArr.map(url => url.trim()).filter(url => url.startsWith('https'));
        try {
            const promises = urlArr.map(url => fetch(url).then(response => {
                if (!response.ok) {
                    console.error(`Error fetching ${url}: ${response.statusText}`);
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            }));

            const results = await Promise.all(promises);
            // console.log('Fetched results:', results[0].name, results[1].name);

            // Simplified state update
            setCharacterData(prevData => ({
                ...prevData,
                [charType]: results // Dynamically updating based on charType
            }));

            toggleShowNames(cardId);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setCharacterData(prevData => ({ ...prevData, [charType]: [] })); // Reset only the problematic part
        }
    };

    const toggleShowNames = (id) => {
        setShowNames(prevData => ({
            ...prevData,
            [id]: !prevData[id]
        }));
    };

    return { characterData, showNames, fetchData, toggleShowNames };
}
