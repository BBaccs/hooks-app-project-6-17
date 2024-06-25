import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, CardActions, CardMedia } from '@mui/material';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';
import { useToggle } from "../hooks/useToggle";
import './../App.css';
import PropTypes from 'prop-types';

function EpisodeCard({ data }) {
  const { characterData, fetchData } = useCharacterDataFetcher();
  const { name, id, episode, characters, img } = data;
  const { toggleStates, setToggle } = useToggle({});
  const [hasDataFetched, setHasDataFetched] = useState(false);

  const handleClick = (buttonId) => {
    if (!hasDataFetched && characterData.notable) {
      console.log('FETCHING')
      fetchData(characters, 'notable');
      setHasDataFetched(true);
    }
    setToggle(buttonId);
  };

  useEffect(() => {
    if (toggleStates[`character-btn${id}`] && characterData.notable && characterData.notable.length > 0) {
      characterData.notable.forEach((member, index) => {
        // console.log('storinglocally', member)
        window.localStorage.setItem(`Character List ${id}-${index}`, JSON.stringify([member.name, member.age]));
      });
    }
  }, [toggleStates, characterData.notable, id]);

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
        <Button id={`character-btn${id}`} onClick={() => handleClick(`character-btn${id}`)} size="large">{toggleStates[`character-btn${id}`] ? 'hide' : 'show'} Characters List</Button>
      </CardActions>
      <>
        <ul id={id} className={toggleStates[`character-btn${id}`] ? 'show' : 'hide'}>
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

EpisodeCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
    episode: PropTypes.string.isRequired,
    characters: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.number
    })),
    img: PropTypes.string
  }).isRequired
};


export default EpisodeCard;