import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions, CardMedia } from '@mui/material';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';
import useGeneralDataFetch from '../hooks/useGeneralDataFetch';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import { useToggle } from "../hooks/useToggle";
import PropTypes from 'prop-types';

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
    <Card key={id} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt=""
        height="140"
        image={cleanImageUrl(img)}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Territory: {territory}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Region: {region}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          id={buttonId}
          onClick={() => handleEpisodeClick(buttonId)}
          size="large"
        >
          {isToggled ? 'Hide' : 'Show Debut:'}
        </Button>
        {isToggled && (
          <Typography>
            {hasName ? `${generalApiData.episode}: ${generalApiData.name}` : 'Unknown'}
          </Typography>
        )}
      </CardActions>
      {notable_inhabitants && notable_inhabitants.length > 0 && (
        <CardActions>
          <Button id={`notablesBtn${id}`} onClick={() => handleClick(`notablesBtn${id}`)} size="large">
            {toggleStates[`notablesBtn${id}`] ? 'Hide' : 'Notable People'}
          </Button>
        </CardActions>
      )}
      <Typography>
        {renderNotableInhabitants()}
      </Typography>
    </Card>
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