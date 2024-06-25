import React, { useEffect } from 'react';
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
  const { toggleStates, setToggle } = useToggle({ });


  const extractedUrlPath = (url) => {
    if (url && typeof url === 'string') {
    // Find the index of ".com/" 
    const index = url.indexOf(".com/") + 5;  // Adding 5 to move past the length of ".com/"
    // Extract everything after ".com/"
    const extractedPath = url.substring(index);
    return extractedPath;
    } else return false;
  }

  const handleClick = (buttonId) => {
    setToggle(buttonId); 
    fetchData(notable_inhabitants, 'notable');

};


const handleEpisodeClick = (buttonId) => {
  setToggle(buttonId); 
}

  useEffect(() => {
    const fixedUrl = extractedUrlPath(debut);
    fetchGeneralApiData(fixedUrl);
    console.log('notables')
  }, [debut]);

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
        <Button id={`stateBtn${id}`} onClick={() => handleEpisodeClick(`stateBtn${id}`)} size="large">{toggleStates[`stateBtn${id}`] ? 'Hide' : 'Show Debut:'}</Button>
        {
          toggleStates[`stateBtn${id}`] && generalApiData.name && generalApiData.name.length > 0 &&
          <Typography>
            {generalApiData.episode}: {generalApiData.name}
          </Typography>
        }
      </CardActions>
      <CardActions>
        {notable_inhabitants && notable_inhabitants.length > 0 &&
          <Button id={`notablesBtn${id}`} onClick={() => handleClick(`notablesBtn${id}`)} size="large">{toggleStates[`notablesBtn${id}`] ? 'Hide' : 'Notable People'}</Button>
        }
      </CardActions>
      <Typography>
        {toggleStates && toggleStates[`notablesBtn${id}`] && characterData.notable && characterData.notable.length > 0 &&
          <ul> <b>Notable Inhabitants:</b>
            {characterData.notable.map((char, index) => (
              <li key={index}>{char.name}</li>
            ))}
          </ul>
        }
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