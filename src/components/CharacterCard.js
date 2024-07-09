import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import {
  StyledCharacterCard,
  StyledCardContent,
  StyledTypography,
  StyledButton,
  StyledCardActions,
  StyledCardMedia
} from '../styles/StyledComponents';
import cleanImageUrl from '../Utilities/cleanImageUrl';

const CharacterCard = memo(function CharacterCard({ data }) {
  const [toggleAlias, setToggleAlias] = useState(false);
  const { id, name, height, age, roles, img, alias, groups } = data;
  const subGroups = groups && groups.length > 0 ? groups[0].sub_groups : [];

  return (
    <StyledCharacterCard key={id}>
      <StyledCardMedia
        component="img"
        alt=""
        height="140"
        image={cleanImageUrl(img)}
      />
      <StyledCardContent>
        <StyledTypography gutterBottom variant="h5" component="div">{name}</StyledTypography>
        {height && (
          <StyledTypography variant="body2" color="text.secondary">Height: {height}</StyledTypography>
        )}
        {age && (
          <StyledTypography variant="body2" color="text.secondary">Age: {age}</StyledTypography>
        )}
        {roles && (
          <StyledTypography>Roles: {roles.join(', ')}</StyledTypography>
        )}
        {subGroups.length > 0 && (
          <StyledTypography>Sub Groups: {subGroups}</StyledTypography>
        )}
      </StyledCardContent>
      <StyledCardActions>
        {alias && alias.length > 0 && (
          <StyledButton onClick={() => setToggleAlias(!toggleAlias)} size="small">Reveal Alias</StyledButton>
        )}
      </StyledCardActions>
      {toggleAlias && (
        <StyledTypography style={{ marginBottom: '10px' }}>
          {alias.length > 0 ? `Alias: ${alias}` : "No Alias"}
        </StyledTypography>
      )}
    </StyledCharacterCard>
  );
});

CharacterCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string,
    alias: PropTypes.arrayOf(PropTypes.string),
    height: PropTypes.string,
    age: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    roles: PropTypes.arrayOf(PropTypes.string),
    groups: PropTypes.arrayOf(PropTypes.shape({
      sub_groups: PropTypes.arrayOf(PropTypes.string)
    }))
  }).isRequired
};

export default CharacterCard;