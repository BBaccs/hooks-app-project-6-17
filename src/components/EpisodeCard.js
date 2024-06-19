import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions, CardMedia } from '@mui/material';
import './../App.css';

function EpisodeCard({ data }) {
  const [characterData, setCharacterData] = useState([]);
  const [showNames, setShowNames] = useState({});

  async function fetchData(urlArr, cardId) {
    try {
      const promises = urlArr.map(url => fetch(url).then(response => {
        console.log(url)
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      }));
      const results = await Promise.all(promises);
      setCharacterData(results);
      handleClick(cardId);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setCharacterData([]);
    }
  }

  const handleClick = (id) => {
    setShowNames(prevData => ({
      ...prevData,
      [id]: !prevData[id]
    }));
  };

  function cleanImageUrl(url) {
    if (!url) return '/logo512.png'; // Add a placeholder img here
    const indexOfPng = url.indexOf('.png');
    if (indexOfPng !== -1) {
      return url.substring(0, indexOfPng + 4);
    }
    return url;
  }

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