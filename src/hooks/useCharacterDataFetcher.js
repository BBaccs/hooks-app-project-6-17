import { useState, useCallback } from 'react';

function separateUrls(urlArray) {
    const validUrlsArr = urlArray.filter(url => typeof url === 'string' && url.startsWith('https'));
    const invalidUrlsArr = urlArray.filter(url => typeof url === 'string' && !url.startsWith('https'));
    const invalidUrlObjArr = invalidUrlsArr.map(url => ({ name: url }));

    return { validUrlsArr, invalidUrlObjArr };
}

export default function useCharacterDataFetcher() {
    const [characterData, setCharacterData] = useState({ current: [], former: [], notable: [] });

    const fetchData = useCallback(async (urlData, charType) => {
        const urlArr = Array.isArray(urlData) ? urlData : urlData.split(",");
        const { validUrlsArr, invalidUrlObjArr } = separateUrls(urlArr);

        if (validUrlsArr.length === 0 && invalidUrlObjArr.length === 0) {
            return;
        }

        try {
            const promises = validUrlsArr.map(url => fetch(url).then(response => {
                if (!response.ok) {
                    console.error('Network response was not ok: ' + response.statusText);
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            }));

            let results = await Promise.all(promises);
            results = results.concat(invalidUrlObjArr);

            setCharacterData(prevProps => ({
                ...prevProps,
                [charType]: results
            }));
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setCharacterData([]);
        }
    }, []);

    return { characterData, fetchData };
}
