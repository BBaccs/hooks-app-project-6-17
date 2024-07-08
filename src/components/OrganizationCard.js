import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyledOrganizationCard,
  StyledCardContent,
  StyledTypography,
  StyledButton,
  StyledCardActions,
  StyledCardMedia
} from '../styles/StyledComponents';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';
import { useToggle } from "../hooks/useToggle";

function OrganizationCard({ data }) {
  const { characterData, fetchData } = useCharacterDataFetcher();
  const { toggleStates, setToggle } = useToggle({});
  const { name, id, affiliation, debut, notable_members, img } = data;
  const [hasDataFetched, setHasDataFetched] = useState(false);

  // Safe check to ensure notable_members is an array and has items
  const hasNotableMembers = Array.isArray(notable_members) && notable_members.length > 0;

  const handleClick = (buttonId) => {
    // Fetch data only if it hasn't been fetched yet
    if (hasNotableMembers && !hasDataFetched) {
      fetchData(notable_members, 'notable');
      setHasDataFetched(true);
    }
    // If data has been fetched once on a specific card, only show/hide the data, don't fetch again.
    setToggle(buttonId);
  };

  // useEffect(() => {
  //   // Check if notable_members data is available and if it should be shown
  //   if (toggleStates[`character-btn${id}`] && characterData.notable && characterData.notable.length > 0) {
  //     characterData.notable.forEach((member, index) => {
  //       window.localStorage.setItem(`Notable Members ${id}-${index}`, JSON.stringify(member.name));
  //     });
  //   }
  // }, [toggleStates, characterData.notable, id]);

  return (
    <StyledOrganizationCard key={id}>
      <StyledCardMedia
        component="img"
        alt=""
        height="140"
        image={cleanImageUrl(img) || '/placeholder.webp'}
      />
      <StyledCardContent>
        <StyledTypography gutterBottom variant="h5" component="div">
          {name || 'Unknown Organization'}
        </StyledTypography>
        {affiliation ? (
          <StyledTypography variant="body2" color="text.secondary">
            Affiliation: {affiliation}
          </StyledTypography>
        ) : (
          <StyledTypography variant="body2" color="text.secondary">
            No affiliation provided
          </StyledTypography>
        )}
        {debut ? (
          <StyledTypography variant="body2" color="text.secondary">
            Debut Episode: <a href={debut} target="_blank" rel="noopener noreferrer">Episode Link</a>
          </StyledTypography>
        ) : (
          <StyledTypography variant="body2" color="text.secondary">
            Debut episode information unavailable
          </StyledTypography>
        )}
      </StyledCardContent>
      <StyledCardActions>
        {hasNotableMembers ? (
          <StyledButton id={toggleStates[`character-btn${id}`]} onClick={() => handleClick(`character-btn${id}`)} size="large">
            {toggleStates[`character-btn${id}`] ? 'hide' : 'show'} Notable Members
          </StyledButton>
        ) : (
          <p>No known notable members</p>
        )}
      </StyledCardActions>
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
    </StyledOrganizationCard>
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
