import { useState } from 'react';

export default function useGeneralDataFetch() {
    const [generalApiData, setApiData] = useState({ results: [] })
    async function fetchGeneralApiData(type) {
        const url = `https://api.attackontitanapi.com/${type}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const apiData = await response.json();
            setApiData(apiData);
            console.log('apidata', generalApiData.name)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    return { generalApiData, fetchGeneralApiData, setApiData };
}