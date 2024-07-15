import { useState, useCallback, useRef } from 'react';

export default function useGeneralDataFetch() {
    const [generalApiData, setApiData] = useState({ results: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(null);
    const generalCache = useRef({});

    const fetchGeneralApiData = useCallback(async (type) => {
        console.log('Fetching general data for type:', type);
        if (generalCache.current[type]) {
            console.log('Using cached general data for:', type);
            setApiData(generalCache.current[type]);
            return;
        }

        if (typeof type === 'string') {
            const url = `https://api.attackontitanapi.com/${type}`;
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const apiData = await response.json();
                generalCache.current[type] = apiData; // Cache the response
                setApiData(apiData);
                console.log('Fetched general data:', generalCache.current);
            } catch (error) {
                setError(error.message);
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            console.error('Invalid type provided to fetchGeneralApiData from AOT API:', type);
        }
    }, []);

    const [episodeData, setEpisodeData] = useState({ results: [] });
    const [isEpisodeLoading, setIsEpisodeLoading] = useState(false);
    const [isEpisodeError, setEpisodeError] = useState(null);
    const episodeCache = useRef({});

    const fetchEpisodeData = useCallback(async (episodeId) => {
        console.log('Fetching episode data for:', episodeId);
        const cacheKey = `episodes/${episodeId}`;

        // Log the entire cache to verify the structure
        console.log('Current episode cache:', episodeCache.current);

        if (episodeCache.current[cacheKey]) {
            console.log('Using cached episode data for:', cacheKey);
            setEpisodeData(episodeCache.current[cacheKey]);
            return;
        }

        if (typeof episodeId === 'string') {
            const url = `https://api.attackontitanapi.com/${episodeId}`;
            setIsEpisodeLoading(true);
            setEpisodeError(null);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const apiData = await response.json();
                episodeCache.current[cacheKey] = apiData; // Cache the response
                setEpisodeData(apiData);
                console.log('Fetched and cached episode data:', apiData);
            } catch (error) {
                setEpisodeError(error.message);
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                setIsEpisodeLoading(false);
            }
        } else {
            console.error('Invalid episode ID provided to fetchEpisodeData from AOT API:', episodeId);
        }
    }, []);

    return { 
        generalApiData, 
        isLoading, 
        isError, 
        fetchGeneralApiData,
        episodeData,
        isEpisodeLoading,
        isEpisodeError,
        fetchEpisodeData
    };
}
