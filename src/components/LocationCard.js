import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

function LocationCard({ data }) {
  const {id, name, territory, region, debut, notable_inhabitants, notable_former_inhabitants} = data;
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
        {notable_inhabitants && notable_inhabitants.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary">Notable Inhabitants:</Typography>
            <ul>
              {notable_inhabitants.map((inhabitant, idx) => (
                <li key={idx}>{inhabitant}</li>
              ))}
            </ul>
          </>
        )}
        {notable_former_inhabitants && notable_former_inhabitants.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary">Notable Former Inhabitants:</Typography>
            <ul>
              {notable_former_inhabitants.map((inhabitant, idx) => (
                <li key={idx}>{inhabitant}</li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
      <CardActions>
        <Button onClick={() => console.log('More about:', name)} size="large">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default LocationCard;
