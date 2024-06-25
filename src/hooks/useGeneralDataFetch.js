import { useState, useCallback } from 'react';

export default function useGeneralDataFetch() {
    const [generalApiData, setApiData] = useState({ results: [] });

    const fetchGeneralApiData = useCallback(async (type) => {
        const url = `https://api.attackontitanapi.com/${type}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.log(url)
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const apiData = await response.json();
            setApiData(apiData);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Optionally handle state update on error:
            // setApiData({ results: [] }); // Clear previous data or handle accordingly
        }
    }, []); // Empty dependency array ensures this function is memoized and only created once

    return { generalApiData, fetchGeneralApiData };
}
