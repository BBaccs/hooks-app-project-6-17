import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import cleanImageUrl from '../Utilities/cleanImageUrl';

function CharacterCard({ data }) {
  const { id, name, height, age, roles, img, alias, groups } = data;
  const subGroups = groups && groups.length > 0 ? groups[0].sub_groups : [];
  return (
    <Card id={id} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt=""
        height="140"
        image={cleanImageUrl(img)}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">{name}</Typography>
        {height && (
          <Typography variant="body2" color="text.secondary">Height: {height}</Typography>
        )}
        {age && (
          <Typography variant="body2" color="text.secondary">Age: {age}</Typography>
        )}
        {roles && (
          <Typography>Roles: {roles.join(', ')}</Typography>
        )}
        {subGroups.length > 0 && (
          <Typography>Sub Groups: {subGroups}</Typography>
        )}
        {alias.length > 0 && (
          <Typography>Alias: {alias}</Typography>
        )}
      </CardContent>
      <CardActions>
        {/* <Button onClick={() => fetchData()} size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}

export default CharacterCard;