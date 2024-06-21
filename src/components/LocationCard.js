import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';
import useGeneralDataFetch from '../hooks/useGeneralDataFetch';

function LocationCard({ data }) {
  const { characterData, showNames, fetchData, toggleShowNames } = useCharacterDataFetcher();
  const { generalData, setGeneralData } = useGeneralDataFetch();
  const { id, name, territory, region, debut, notable_inhabitants } = data;

  const handleClick = () => {
    fetchData(notable_inhabitants, id, 'notable');
    toggleShowNames(!showNames);
  };

  const handleClick2 = () => {
    setGeneralData(debut, id)
    console.log('bigdata', generalData, debut, id)
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
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
            <Button onClick={handleClick} size="large">{showNames[id] ? 'Hide' : 'Learn More'}</Button>
          }
        </CardActions>
      </CardContent>
      <CardActions>
        <Button onClick={handleClick2} size="large">debut</Button>
        {
          generalData && generalData.length &&
          <Typography>
            Gen data: {generalData}
          </Typography>
        }
      </CardActions>
      {showNames[id] && characterData.notable && characterData.notable.length > 0 &&
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