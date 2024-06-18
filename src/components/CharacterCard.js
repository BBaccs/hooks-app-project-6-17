import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';

function CharacterCard({ data }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={data.name}
        height="140"
        image={data.img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">{data.name}</Typography>
        {data.height && (
          <Typography variant="body2" color="text.secondary">Height: {data.height}</Typography>
        )}
        {data.age && (
          <Typography variant="body2" color="text.secondary">Age: {data.age}</Typography>
        )}
        {data.roles && (
          <Typography>Roles: {data.roles.join(', ')}</Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default CharacterCard;