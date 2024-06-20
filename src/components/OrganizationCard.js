import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';

function OrganizationCard({ data }) {
  const { characterData, showNames, fetchData } = useCharacterDataFetcher();
  const { name, id, affiliation, debut, notable_members, img } = data;
  // Safe check to ensure notable_members is an array and has items
  const hasNotableMembers = Array.isArray(notable_members) && notable_members.length > 0;


  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        alt=""
        height="140"
        image={cleanImageUrl(img) || '/placeholder.webp'}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name || 'Unknown Organization'}
        </Typography>
        {affiliation ? (
          <Typography variant="body2" color="text.secondary">
            Affiliation: {affiliation}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No affiliation provided
          </Typography>
        )}
        {debut ? (
          <Typography variant="body2" color="text.secondary">
            Debut Episode: <a href={debut} target="_blank" rel="noopener noreferrer">Episode Link</a>
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Debut episode information unavailable
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {hasNotableMembers ? (
          <Button onClick={() => fetchData(notable_members, id,'notable')} size="large">{showNames[id] ? 'hide' : 'show'} Notable Members</Button>
        ) : (
          <p>No known notable members</p>
        )}
      </CardActions>
      <ul id={id} className={showNames[id] ? 'show' : 'hide'}>
        {characterData.notable.map((char, index) => (
          <li className="mb-2" key={index}>
            <span><b>Name:</b> {char.name}</span>
            <span style={{ display: 'block' }}>
              {char.age && char.age !== 'unknown' ? <><b>Age:</b> {char.age}</> : ''}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default OrganizationCard;
