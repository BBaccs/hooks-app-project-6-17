import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';
import useGeneralDataFetch from '../hooks/useGeneralDataFetch';
import cleanImageUrl from '../Utilities/cleanImageUrl';
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
  const { generalApiData, fetchGeneralApiData } = useGeneralDataFetch();
  const { id, name, territory, region, debut, notable_inhabitants, img } = data;
  const { toggleStates, setToggle } = useToggle({});
  const [hasDataFetched, setHasDataFetched] = useState(false);

  // Function to extract URL path from a full URL
  const extractedUrlPath = (url) => {
    if (url && typeof url === 'string' && url.startsWith('https')) {
      // Find the index of ".com/" add 5 to move past the length of ".com/"
      const index = url.indexOf(".com/") + 5;
      // Extract everything after ".com/"
      const extractedPath = url.substring(index);
      return extractedPath;
    }
    return null;
  }

  // Handler for fetching notable inhabitants and toggling state
  const handleClick = (buttonId) => {
    if (!hasDataFetched) {
      fetchData(notable_inhabitants, 'notable');
      setHasDataFetched(true);
    }
    setToggle(buttonId);
  };

  const handleEpisodeClick = (buttonId) => {
    setToggle(buttonId);
  }

  // Fetch general API data on component mount if debut exists
  useEffect(() => {
    if (debut && debut.length > 0) {
      const fixedUrl = extractedUrlPath(debut);
      fetchGeneralApiData(fixedUrl);
    }
  }, [debut]);

  const buttonId = `stateBtn${id}`;
  const isToggled = toggleStates[buttonId];
  const hasName = generalApiData.name && generalApiData.name.length > 0;

  // Render notable inhabs if they exist
  const renderNotableInhabitants = () => (
    toggleStates[`notablesBtn${id}`] && characterData.notable && characterData.notable.length > 0 && (
      <ul>
        <b>Notable Inhabitants:</b>
        {characterData.notable.map((char, index) => (
          <li key={index}>{char.name}</li>
        ))}
      </ul>
    )
  );

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
          {name}
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
            {hasName ? `${generalApiData.episode}: ${generalApiData.name}` : 'Unknown'}
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
        {renderNotableInhabitants()}
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