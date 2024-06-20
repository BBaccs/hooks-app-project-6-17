import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions, CardMedia } from '@mui/material';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';
import './../App.css';

function EpisodeCard({ data }) {
  const { characterData, showNames, fetchData } = useCharacterDataFetcher();
  const { name, id, episode, characters, img } = data;
  return (
    <Card key={id} sx={{ maxWidth: 345 }}>
      <CardContent>
        <CardMedia
          component="img"
          alt=''
          height="140"
          image={cleanImageUrl(img)}
        />
        <Typography gutterBottom variant="h5" component="div">
          <b>Title:</b> {name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          <b>Episode:</b> {episode}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => fetchData(characters, id, 'notable')} size="large">{showNames[id] ? 'hide' : 'show'} Characters List</Button>
      </CardActions>
      <>
        <ul id={id} className={showNames[id] ? 'show' : 'hide'}>
          {characterData.notable.map((char, index) =>
            <li className="mb-2" key={index}>
              <span><b>Name:</b> {char.name}</span>
              <span style={{ display: 'block' }}>
                {char.age === 'unknown' || !char.age ? '' : <><b>Age:</b> {char.age}</>}
              </span>
            </li>
          )}
        </ul>
      </>
    </Card>
  );
}

export default EpisodeCard;