import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';

function LocationCard({ data }) {
  const { characterData, showNames, fetchData } = useCharacterDataFetcher();
  const { id, name, territory, region, debut, notable_inhabitants } = data;

  const handleClick = () => {
    fetchData(notable_inhabitants, id, 'notable');
  };

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
        <Typography variant="body2" color="text.secondary">
          Debut: {debut}
        </Typography>
        {characterData && notable_inhabitants.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary">Notable Inhabitants:</Typography>
            <ul>
              {notable_inhabitants.map((inhabitant, idx) => (
                <li key={idx}>{inhabitant}</li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
      <CardActions>
        {
          characterData && notable_inhabitants.length > 0 &&
          <Button onClick={() => handleClick(notable_inhabitants, id, 'notable')} size="large">{showNames[id] ? 'Hide' : 'Learn More'}</Button>
        }
      </CardActions>
      {characterData.notable && notable_inhabitants.length > 0 &&
          <ul className={showNames[id] ? 'show' : 'hide'}> <b>Notable Inhabitants:</b>
            {characterData.notable.map((char, id) => (
              <li id={char.id}>{char.name}</li>
            ))}
          </ul>
      }
    </Card>
  );
}

export default LocationCard;
