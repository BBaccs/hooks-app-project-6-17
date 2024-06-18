import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions, CardMedia } from '@mui/material';

function EpisodeCard({ data }) {
  const [characterData, setCharacterData] = useState([]);
  const [showNames, setShowNames] = useState({ showNames: false });

  async function fetchData(urlArr) {
    try {
      const promises = urlArr.map(url => fetch(url).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      }));
      const results = await Promise.all(promises);
      setCharacterData(results); // Assuming you want to store all fetched data
      results.forEach(character => {
        // console.log(character.name);
      });
      // console.log(results.map(char => <p>{char.name}</p>));
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setCharacterData([]); // Clear previous data or handle error state
    }
  }

const handleClick = (e, characters) => {
  console.log(e.target.id);  // Now, e.target should correctly point to the button
  setShowNames(prevData => ({
    ...prevData,
    showNames: !prevData.showNames
  }));
};


return (
  <Card key={data.id} sx={{ maxWidth: 345 }}>
    <CardContent>
      <CardMedia
        component="img"
        alt={data.name}
        height="140"
        image={data.img}
      />
      <Typography gutterBottom variant="h5" component="div">
        <b>Title:</b> {data.name}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        <b>Episode:</b> {data.episode}
      </Typography>
    </CardContent>
    <CardActions>
      <Button onClick={() => fetchData(data.characters)} size="large">Show Character List</Button>
      <Button onClick={(e) => handleClick(e, data.characters)} size="large">Hide List</Button>

    </CardActions>
    <Typography>
    {/* <Typography style={showNames.showNames ?  {display: 'block'} : {display: 'none'}}> */}
      <ul>
        {characterData.map((char, index) =>
          <li key={index}>
            <span><b>Name:</b> {char.name}</span>
            <span style={{ display: 'block' }}>
              {char.age === 'unknown' || !char.age ? '' : <><b>Age:</b> {char.age}</>}
            </span>
          </li>
        )}
      </ul>
    </Typography>
  </Card>
);
}

export default EpisodeCard;


//ARR
// data.character

// OBJ
// https://api.attackontitanapi.com/characters/1