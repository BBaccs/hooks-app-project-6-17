import { useState, useCallback, useContext } from 'react';
import { useCardContext } from '../contexts/CardContext';

export default function useGeneralDataFetch() {
    const { generalCache, setGeneralCache, episodeCache, setEpisodeCache } = useCardContext();
    const [generalApiData, setApiData] = useState({ results: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(null);

    const fetchGeneralApiData = useCallback(async (type) => {
        console.log('Fetching general data for type:', type);
        if (generalCache[type]) {
            console.log('Using cached general data for:', type);
            setApiData(generalCache[type]);
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
                setGeneralCache((prevCache) => ({
                    ...prevCache,
                    [type]: apiData
                }));
                setApiData(apiData);
                console.log('Fetched general data:', apiData);
            } catch (error) {
                setError(error.message);
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            console.error('Invalid type provided to fetchGeneralApiData from AOT API:', type);
        }
    }, [generalCache, setGeneralCache]);

    const [episodeData, setEpisodeData] = useState({ results: [] });
    const [isEpisodeLoading, setIsEpisodeLoading] = useState(false);
    const [isEpisodeError, setEpisodeError] = useState(null);

    const fetchEpisodeData = useCallback(async (episodeId) => {
        console.log('Fetching episode data for:', episodeId);
        const cacheKey = `episodes/${episodeId}`;

        if (episodeCache[cacheKey]) {
            console.log('Using cached episode data for:', cacheKey);
            setEpisodeData(episodeCache[cacheKey]);
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
                setEpisodeCache((prevCache) => ({
                    ...prevCache,
                    [cacheKey]: apiData
                }));
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
    }, [episodeCache, setEpisodeCache]);

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
