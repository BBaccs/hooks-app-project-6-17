import React, { useState } from 'react';

export default function useCharacterDataFetcher(urlArr, cardId) {
    const [characterData, setCharacterData] = useState([]);
    const [showNames, setShowNames] = useState({});

    async function fetchData(urlArr, cardId) {
        try {
            const promises = urlArr.map(url => fetch(url).then(response => {
                console.log(url)
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            }));
            const results = await Promise.all(promises);
            setCharacterData(results);
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