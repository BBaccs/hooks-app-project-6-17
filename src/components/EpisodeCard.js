import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions, CardMedia } from '@mui/material';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';
import './../App.css';

function EpisodeCard({ data }) {
  const { characterData, showNames, fetchData } = useCharacterDataFetcher();

  return (
    <Card key={data.id} sx={{ maxWidth: 345 }}>
      <CardContent>
        <CardMedia
          component="img"
          alt=''
          height="140"
          image={cleanImageUrl(data.img)}
        />
        <Typography gutterBottom variant="h5" component="div">
          <b>Title:</b> {data.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          <b>Episode:</b> {data.episode}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => fetchData(data.characters, data.id)} size="large">{showNames[data.id] ? 'hide' : 'show'} Characters List</Button>
      </CardActions>
      <>
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
      </>
    </Card>
  );
}

export default EpisodeCard;