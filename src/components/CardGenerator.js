import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import CharacterCard from './CharacterCard';
import TitanCard from './TitanCard';
import LocationCard from './LocationCard';
import OrganizationCard from './OrganizationCard';
import EpisodeCard from './EpisodeCard';

const CardGenerator = ({ data, type }) => {
  const cardComponents = useMemo(() => ({
    characters: CharacterCard,
    locations: LocationCard,
    organizations: OrganizationCard,
    titans: TitanCard,
    episodes: EpisodeCard,
  }), []);

  const getCardComponent = useCallback((data, type) => {
    console.log('getCardComponent render');
    const Component = cardComponents[type];
    return Component ? <Component data={data} /> : null;
  }, [cardComponents]);

  return getCardComponent(data, type);
};

CardGenerator.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default CardGenerator;