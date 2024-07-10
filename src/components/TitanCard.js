import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyledTitanCard,
  StyledCardContent,
  StyledTypography,
  StyledCardMedia
} from '../styles/StyledComponents';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';

function TitanCard({ data }) {
  const { characterData, fetchData } = useCharacterDataFetcher();
  const { name, id, height, abilities, relatives, allegiance, former_inheritors, current_inheritor, img } = data;

  useEffect(() => {
    if (current_inheritor) {
      fetchData(current_inheritor, 'current');
    }
  }, [current_inheritor, fetchData]);

  useEffect(() => {
    if (former_inheritors) {
      fetchData(former_inheritors, 'former');
    }
  }, [former_inheritors, fetchData]);

  return (
    <StyledTitanCard key={id}>
      <StyledCardMedia
        component="img"
        alt=""
        height="140"
        image={cleanImageUrl(img)}
      />
      <StyledCardContent>
        <StyledTypography gutterBottom variant="h5" component="div">
          {name}
        </StyledTypography>
        <StyledTypography variant="body2" color="text.secondary">
          Height: {height}
        </StyledTypography>
        {relatives && relatives.length > 0 && (
          <StyledTypography component="div">
            Relatives:
            <ul>
              {relatives.map((relative, index) => (
                <li key={index}>{relative.family}</li>
              ))}
            </ul>
          </StyledTypography>
        )}
        {abilities && abilities.length > 0 && (
          <StyledTypography component="div">
            Abilities:
            <ul>
              {abilities.map((ability, index) => (
                <li key={index}>{ability}</li>
              ))}
            </ul>
          </StyledTypography>
        )}
        <StyledTypography>
          Loyal to: {allegiance}
        </StyledTypography>
        {characterData.current && characterData.current.length > 0 && (
          characterData.current.map((char) => (
            <StyledTypography key={char.id}>Current Inheritor: {char.name}</StyledTypography>
          ))
        )}
        {characterData.former && characterData.former.length > 0 && (
          <StyledTypography component="div">
            <p><b>Former Inheritors:</b></p>
            <ul>
              {characterData.former.map((char) => (
                <li key={char.id}>{char.name}</li>
              ))}
            </ul>
          </StyledTypography>
        )}
      </StyledCardContent>
    </StyledTitanCard>
  );
}

TitanCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    abilities: PropTypes.arrayOf(PropTypes.string),
    allegiance: PropTypes.string,
    height: PropTypes.string,
    relatives: PropTypes.arrayOf(PropTypes.shape({
      family: PropTypes.string
    })),
    current_inheritor: PropTypes.string,
    former_inheritors: PropTypes.arrayOf(PropTypes.string),
    img: PropTypes.string
  }).isRequired
};

export default TitanCard;
