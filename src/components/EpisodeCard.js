import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyledEpisodeCard,
  StyledCardContent,
  StyledTypography,
  StyledButton,
  StyledCardActions,
  StyledCardMedia,
  ToggleableList,
  ToggleableItem
} from '../styles/StyledComponents';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';
import { useToggle } from "../hooks/useToggle";
import './../App.css';

function EpisodeCard({ data }) {
  const { characterData, fetchData } = useCharacterDataFetcher();
  const { name, id, episode, characters, img } = data;
  const { toggleStates, setToggle } = useToggle({});
  const [hasDataFetched, setHasDataFetched] = useState(false);

  const handleClick = (buttonId) => {
    if (!hasDataFetched && characterData.notable) {
      fetchData(characters, 'notable');
      setHasDataFetched(true);
    }
    setToggle(buttonId);
  };

  // useEffect(() => {
  //   if (toggleStates[`character-btn${id}`] && characterData.notable && characterData.notable.length > 0) {
  //     characterData.notable.forEach((member, index) => {
  //       window.localStorage.setItem(`Character List ${id}-${index}`, JSON.stringify([member.name, member.age]));
  //     });
  //   }
  // }, [toggleStates, characterData.notable, id]);

  return (
    <StyledEpisodeCard key={id}>
      <StyledCardContent>
        <StyledCardMedia
          component="img"
          alt=''
          height="140"
          image={cleanImageUrl(img)}
        />
        <StyledTypography gutterBottom variant="h5" component="div">
          <b>Title:</b> {name}
        </StyledTypography>
        <StyledTypography gutterBottom variant="h5" component="div">
          <b>Episode:</b> {episode}
        </StyledTypography>
      </StyledCardContent>
      <StyledCardActions>
        <StyledButton id={`character-btn${id}`} onClick={() => handleClick(`character-btn${id}`)} size="large">
          {toggleStates[`character-btn${id}`] ? 'hide' : 'show'} Characters List
        </StyledButton>
      </StyledCardActions>
      <ToggleableList id={id} show={toggleStates[`character-btn${id}`]}>
        {characterData.notable.map((char, index) =>
          <ToggleableItem key={index}>
            <span><b>Name:</b> {char.name}</span>
            <span style={{ display: 'block' }}>
              {char.age === 'unknown' || !char.age ? '' : <><b>Age:</b> {char.age}</>}
            </span>
          </ToggleableItem>
        )}
      </ToggleableList>
    </StyledEpisodeCard>
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