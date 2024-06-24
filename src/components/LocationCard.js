import React from 'react';
import { Card, CardContent, Typography, Button, CardActions, CardMedia } from '@mui/material';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';
import useGeneralDataFetch from '../hooks/useGeneralDataFetch';
import cleanImageUrl from '../Utilities/cleanImageUrl'

function LocationCard({ data }) {
  const { characterData, showNames, fetchData, toggleShowNames } = useCharacterDataFetcher();
  const { generalApiData, fetchGeneralApiData }  = useGeneralDataFetch();
  const { id, name, territory, region, debut, notable_inhabitants, img } = data;

  const handleClick = () => {
    fetchData(notable_inhabitants, id, 'notable');
    toggleShowNames(!showNames);
  };

  const handleClick2 = () => {
    console.log('params')
    fetchGeneralApiData('episodes')
  }

  // useEffect(() => {
  //   fetchData(dataType);
  // }, [dataType]);

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
            <Button onClick={handleClick} size="large">{showNames[id] ? 'Hide' : 'Learn More'}</Button>
          }
        </CardActions>
      </CardContent>
      <CardActions>
        <Button onClick={handleClick2} size="large">debut</Button>
        {
          generalApiData && generalApiData.length &&
          <Typography>
            Gen data: {generalApiData}
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