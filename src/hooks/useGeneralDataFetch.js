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