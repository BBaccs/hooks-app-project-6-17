import { useState } from 'react';

export default function useCharacterDataFetcher() {
    const [characterData, setCharacterData] = useState([]);
    const [showNames, setShowNames] = useState({});
    const [formerInheritorName, setFormerInheritorName] = useState("");

    async function fetchData(urlArr) {
        try {
            const promises = urlArr.map(url => fetch(url).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            }));
            const results = await Promise.all(promises);
            setCharacterData(results);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setCharacterData([]);
        }
    };

    async function fetchSingleData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const result = await response.json();
            setFormerInheritorName(result.name); // Assuming the API returns an object with a 'name' property
        } catch (error) {
            console.error('Error fetching single data:', error);
            setFormerInheritorName("");
        }
    }

    const toggleShowNames = (id) => {
        setShowNames(prevData => ({
            ...prevData,
            [id]: !prevData[id]
        }));
    };

    return { characterData, showNames, fetchData, toggleShowNames, fetchSingleData, formerInheritorName };
};
