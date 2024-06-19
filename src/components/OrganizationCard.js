import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import cleanImageUrl from '../Utilities/cleanImageUrl';

function OrganizationCard({ data }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={data.name}
        height="140"
        image={cleanImageUrl(data.img) || '/placeholder.webp'} // Placeholder image if the link is broken
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        {data.affiliation && (
          <Typography variant="body2" color="text.secondary">
            Affiliation: {data.affiliation}
          </Typography>
        )}
        {data.debut && (
          <Typography variant="body2" color="text.secondary">
            Debut Episode: <a href={data.debut} target="_blank" rel="noopener noreferrer">Episode Link</a>
          </Typography>
        )}
        {data.notable_members && data.notable_members.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary">Notable Members:</Typography>
            <ul>
              {data.notable_members.map((member, idx) => (
                <li key={idx}>{member}</li>
              ))}
            </ul>
          </>
        )}
        {data.notable_former_members && data.notable_former_members.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary">Notable Former Members:</Typography>
            <ul>
              {data.notable_former_members.map((member, idx) => (
                <li key={idx}>{member}</li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
      {/* <CardActions>
        <Button onClick={() => console.log('More about:', data.name)} size="large">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default OrganizationCard;
