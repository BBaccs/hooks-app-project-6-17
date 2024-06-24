import { useState } from 'react';

export default function useGeneralDataFetch() {
    const [apiData, setApiData] = useState({ results: [] })
    async function fetchGeneralApiData(type) {
        const url = `https://api.attackontitanapi.com/${type}`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const apiData = await response.json();
          setApiData(apiData);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      }
    return { apiData, fetchGeneralApiData, setApiData };
}