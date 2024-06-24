import { useState } from 'react';

const baseUrl = {
    "characters": "https://api.attackontitanapi.com/characters",
    "locations": "https://api.attackontitanapi.com/locations",
    "organizations": "https://api.attackontitanapi.com/organizations",
    "titans": "https://api.attackontitanapi.com/titans",
    "episodes": "https://api.attackontitanapi.com/episodes"
  }

export default function useGeneralDataFetch() {
    const [apiData, setApiData] = useState({ results: [] })
    async function fetchData(param) {
        console.log(param);
        // Pick the url, based on the param
        const url = baseUrl[param];
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
    return { apiData, fetchData, setApiData };
}



// import { useState } from 'react';

// export default function useGeneralDataFetch() {
//     const [generalData, setGeneralData] = useState({ results: [] });
//     // const [dataType, setDataType] = useState('');
//     async function fetchData(data, id) {
//         console.log('usegeneraldatafetcher.js', data, id)
//         try {
//             const response = await fetch(data);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }
//             const results = await response.json();
//             setGeneralData(results);
//         } catch (error) {
//             console.error('There was a problem with the fetch operation:', error);
//         }
//     }
//     return { generalData, setGeneralData, fetchData };
// }