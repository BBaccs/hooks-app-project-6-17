import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';
import { useToggle } from "../hooks/useToggle";
import PropTypes from 'prop-types';

function OrganizationCard({ data }) {
  const { characterData, fetchData } = useCharacterDataFetcher();
  const { toggleStates, setToggle } = useToggle({  });
  const { name, id, affiliation, debut, notable_members, img } = data;
  // Safe check to ensure notable_members is an array and has items
  const hasNotableMembers = Array.isArray(notable_members) && notable_members.length > 0;

  const handleClick = (buttonId) => {
    hasNotableMembers && fetchData(notable_members, 'notable');
    setToggle(buttonId); 
};
  return (
    <Card key={id} sx={{ maxWidth: 500 }}>
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
          <Button id={toggleStates[`character-btn${id}`]} onClick={() => handleClick(`character-btn${id}`)} size="large">{toggleStates[`character-btn${id}`] ? 'hide' : 'show'} Notable Members</Button>
        ) : (
          <p>No known notable members</p>
        )}
      </CardActions>
      <ul id={id} className={toggleStates[`character-btn${id}`] ? 'show' : 'hide'}>
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

OrganizationCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    affiliation: PropTypes.string,
    debut: PropTypes.string,
    notable_members: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    })),
    img: PropTypes.string
  }).isRequired
};


export default OrganizationCard;
