import React from 'react';
import { Card, CardContent, Typography, Button, CardActions, CardMedia } from '@mui/material';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';

function LocationCard({ data }) {
  const { characterData, showNames, fetchData } = useCharacterDataFetcher();
  const { id, name, territory, region, debut, notable_inhabitants, img } = data;
  return (
    <Card id={id} sx={{ maxWidth: 345 }}>
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
        <Typography variant="body2" color="text.secondary">
          Debut: {debut}
        </Typography>

      </CardContent>
      <CardActions>
        {notable_inhabitants.length > 0 && <Button onClick={() => fetchData(notable_inhabitants, id, 'notable')} size="large">{showNames[id] ? 'Hide Info' : 'Learn More'}</Button>}
      </CardActions>
      {characterData && (
        <>
          <Typography id={id} className={showNames[id] ? 'show' : 'hide'} variant="body2" color="text.secondary">Notable Inhabitants:
            <ul>
              {characterData.notable.map(char => (
                <li key={char.id}>{char.name}</li>
              ))}
            </ul>
          </Typography>
        </>
      )}
    </Card>
  );
}

export default LocationCard;
