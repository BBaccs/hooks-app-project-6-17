import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Button, CardActions, CardMedia } from '@mui/material';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';
import useGeneralDataFetch from '../hooks/useGeneralDataFetch';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import { useToggle } from "../hooks/useToggle";

function LocationCard({ data }) {
  const { characterData, fetchData } = useCharacterDataFetcher();
  const { generalApiData, fetchGeneralApiData } = useGeneralDataFetch();
  const { id, name, territory, region, debut, notable_inhabitants, img } = data;
  const { toggleStates, setToggle } = useToggle({ someBtnId: true, anotherBtnId: false });


  const extractedUrlPath = (url) => {
    // Find the index of ".com/" 
    const index = url.indexOf(".com/") + 5;  // Adding 5 to move past the length of ".com/"
    // Extract everything after ".com/"
    const extractedPath = url.substring(index);
    return extractedPath;
  }

  const handleClick = (buttonId) => {
    console.log(buttonId)
    fetchData(notable_inhabitants, 'notable');
    setToggle(buttonId); 
    console.log(toggleStates[buttonId])
};


  useEffect(() => {
    const fixedUrl = extractedUrlPath(debut);
    fetchGeneralApiData(fixedUrl);
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt=""
        height="140"
        image={cleanImageUrl(img)}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Territory: {territory}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Region: {region}
        </Typography>
      </CardContent>
      <CardActions>
        <Button id={`stateBtn${id}`} onClick={() => setToggle(!toggleStates)} size="large">{!toggleStates ? 'Hide' : 'Show Debut:'}</Button>
        {
          !toggleStates && generalApiData.name && generalApiData.name.length > 0 &&
          <Typography>
            {generalApiData.episode}: {generalApiData.name}
          </Typography>
        }
      </CardActions>
      <CardActions>
        {notable_inhabitants && notable_inhabitants.length > 0 &&
          <Button id={`notablesBtn${id}`} onClick={() => handleClick(`notablesBtn${id}`)} size="large">{toggleStates[`notablesBtn${id}`] ? 'Hide' : 'Notable People'}</Button>
        }
      </CardActions>
      <Typography>
        {toggleStates && toggleStates[`notablesBtn${id}`] && characterData.notable && characterData.notable.length > 0 &&
          <ul> <b>Notable Inhabitants:</b>
            {characterData.notable.map((char, index) => (
              <li key={index}>{char.name}</li>
            ))}
          </ul>
        }
      </Typography>
    </Card>
  );
}

export default LocationCard;