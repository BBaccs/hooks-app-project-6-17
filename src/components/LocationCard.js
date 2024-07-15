import React, { useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';
import useGeneralDataFetch from '../hooks/useGeneralDataFetch';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import { extractUrlPath } from '../Utilities/extractUrlPath';
import { useToggle } from "../hooks/useToggle";
import { Typography } from '@mui/material';
import {
  StyledCard,
  StyledCardContent,
  StyledTypography,
  StyledButton,
  StyledCardActions,
  StyledCardMedia
} from '../styles/StyledComponents';

function LocationCard({ data }) {
  const { characterData, fetchData } = useCharacterDataFetcher();
  const { id, name, territory, region, debut, notable_inhabitants, img } = data; // original data
  const { generalApiData, episodeData, fetchEpisodeData, fetchGeneralApiData } = useGeneralDataFetch(); // second api calls
  const { toggleStates, setToggle } = useToggle({});
  const [hasDataFetched, setHasDataFetched] = useState(false);

  // console.log('characterData', characterData.notable)

  // Fetch notable inhabitants & toggling state
  const handleClick = useCallback((buttonId) => {
    if (!hasDataFetched) {
      fetchData(notable_inhabitants, 'notable');
      setHasDataFetched(true);
    }
    setToggle(buttonId);
  }, [hasDataFetched, fetchData, notable_inhabitants, setToggle]);  // These funcs won't change but it's best practice to use as dependacies

  const handleEpisodeClick = (buttonId) => {
    setToggle(buttonId);
  }

  // Fetch general API data on component mount if debut exists
  useEffect(() => {
    if (debut && debut.length > 0) {
      const fixedUrl = extractUrlPath(debut);
      fetchEpisodeData(fixedUrl);
    }
  }, [debut, fetchEpisodeData, fetchGeneralApiData]);

  const buttonId = `stateBtn${id}`;
  const isToggled = toggleStates[buttonId];
  const hasName = useMemo(() => episodeData.name && episodeData.name.length > 0, [episodeData.name]);

  // Render notable inhabitants if they exist
  const renderNotableInhabitants = useMemo(() => (
    toggleStates[`notablesBtn${id}`] && characterData.notable && characterData.notable.length > 0 && (
      <ul>
        <b>Notable Inhabitants:</b>
        {characterData.notable.map((char, index) => (
          <li key={index}>{char.name}</li>
        ))}
      </ul>
    )
  ), [toggleStates, characterData.notable, id]);

  return (
    <StyledCard key={id}>
      <StyledCardMedia
        component="img"
        alt=""
        height="140"
        image={cleanImageUrl(img)}
      />
      <StyledCardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name} {id}
        </Typography>
        <StyledTypography variant="body2" color="text.secondary">
          Territory: {territory}
        </StyledTypography>
        <StyledTypography variant="body2" color="text.secondary">
          Region: {region}
        </StyledTypography>
      </StyledCardContent>
      <StyledCardActions>
        <StyledButton
          id={buttonId}
          onClick={() => handleEpisodeClick(buttonId)}
          size="large"
        >
          {isToggled ? 'Hide' : 'Show Debut:'}
        </StyledButton>
        {isToggled && (
          <Typography>
            {hasName ? `${episodeData.episode}: ${episodeData.name}` : 'Unknown'}
          </Typography>
        )}
      </StyledCardActions>
      {notable_inhabitants && notable_inhabitants.length > 0 && (
        <StyledCardActions>
          <StyledButton id={`notablesBtn${id}`} onClick={() => handleClick(`notablesBtn${id}`)} size="large">
            {toggleStates[`notablesBtn${id}`] ? 'Hide' : 'Notable People'}
          </StyledButton>
        </StyledCardActions>
      )}
      <Typography>
        {renderNotableInhabitants}
      </Typography>
    </StyledCard>
  );
}

LocationCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    territory: PropTypes.string,
    region: PropTypes.string,
    debut: PropTypes.string,
    notable_inhabitants: PropTypes.arrayOf(PropTypes.string),
    img: PropTypes.string
  }).isRequired
};

export default LocationCard;
