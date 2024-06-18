import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

function LocationCard({ data }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Territory: {data.territory}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Region: {data.region}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Debut: {data.debut}
        </Typography>
        {data.notable_inhabitants && data.notable_inhabitants.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary">Notable Inhabitants:</Typography>
            <ul>
              {data.notable_inhabitants.map((inhabitant, idx) => (
                <li key={idx}>{inhabitant}</li>
              ))}
            </ul>
          </>
        )}
        {data.notable_former_inhabitants && data.notable_former_inhabitants.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary">Notable Former Inhabitants:</Typography>
            <ul>
              {data.notable_former_inhabitants.map((inhabitant, idx) => (
                <li key={idx}>{inhabitant}</li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
      <CardActions>
        <Button onClick={() => console.log('More about:', data.name)} size="large">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default LocationCard;
