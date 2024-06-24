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
  const { toggleState, setToggle } = useToggle();

  const handleClick = () => {
    fetchData(notable_inhabitants, id, 'notable');
    setToggle(!toggleState);
  };

  const handleDebutFetch = (debut) => {
    // Find the index of ".com/" 
    const index = debut.indexOf(".com/") + 5;  // Adding 5 to move past the length of ".com/"
    // Extract everything after ".com/"
    const extractedPath = debut.substring(index);
    fetchGeneralApiData(extractedPath, id);
    setToggle(!toggleState);
  }

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
        <CardActions>
          {notable_inhabitants && notable_inhabitants.length > 0 &&
            <Button onClick={handleClick} size="large">{toggleState ? 'Hide' : 'Learn More'}</Button>
          }
        </CardActions>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleDebutFetch(debut, id)} size="large">debut</Button>
        {
          toggleState && generalApiData.name && generalApiData.name.length > 0 &&
          <Typography>
            {generalApiData.episode}: {generalApiData.name}
          </Typography>
        }
      </CardActions>
      {toggleState[id] && characterData.notable && characterData.notable.length > 0 &&
        <ul> <b>Notable Inhabitants:</b>
          {characterData.notable.map((char, index) => (
            <li key={index}>{char.name}</li>
          ))}
        </ul>
      }
    </Card>
  );
}

export default LocationCard;