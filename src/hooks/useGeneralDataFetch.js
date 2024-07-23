import { useState, useRef } from 'react';

export default function useGeneralDataFetch() {
    const [generalApiData, setApiData] = useState({ results: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(null);
    const cache = useRef({});

    const fetchGeneralApiData = async (type) => {
        // Check for and use cache
        if (cache.current[type]) {
            console.log('fetchGeneralApiData: cache used', cache.current[type])
            setApiData(cache.current[type]);
            return;
        }

        // First API call (no cache yet)
        if (typeof type === 'string') {
            console.log('fetchGeneralApiData: No cache yet, fetching API data')
            const url = `https://api.attackontitanapi.com/${type}`;
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const apiData = await response.json();
                cache.current[type] = apiData; // Cache the response
                setApiData(apiData);
            } catch (error) {
                setError(error.message);
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            console.error('No Action required: Invalid type provided to fetchGeneralApiData from AOT API:', type);
        }
    };

    return { generalApiData, isLoading, isError, fetchGeneralApiData };
}
