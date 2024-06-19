import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';

function OrganizationCard({ data }) {
  const { characterData, showNames, fetchData } = useCharacterDataFetcher();
  const hasNotableMembers = Array.isArray(data.notable_members) && data.notable_members.length > 0;
  return (
    <Card sx={{ maxWidth: 500 }}>
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
      </CardContent>
      <CardActions>
        {data.notable_members.length > 0 ? <Button onClick={() => fetchData(data.notable_members, data.id)} size="large">Notable Members</Button> : <p>No known notable members</p>}
      </CardActions>
      <ul id={data.id} className={showNames[data.id] ? 'show' : 'hide'}>
        {characterData.map((char, index) =>
          <li className="mb-2" key={index}>
            <span><b>Name:</b> {char.name}</span>
            <span style={{ display: 'block' }}>
              {char.age === 'unknown' || !char.age ? '' : <><b>Age:</b> {char.age}</>}
            </span>
          </li>
        )}
      </ul>
    </Card>
  );
}

export default OrganizationCard;
