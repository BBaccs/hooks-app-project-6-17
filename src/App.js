import './App.css';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Grid } from '@mui/material';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorComponent from './components/ErrorComponent';
import CharacterCard from './components/CharacterCard';
import TitanCard from './components/TitanCard';
import LocationCard from './components/LocationCard';
import OrganizationCard from './components/OrganizationCard';
import EpisodeCard from './components/EpisodeCard';
import useGeneralDataFetch from './hooks/useGeneralDataFetch';
import {
  StyledContainer,
  StyledPaper,
  ButtonContainer,
  StyledButton
} from './styles/StyledComponents';

function App() {
  const { generalApiData, isLoading, isError, fetchGeneralApiData } = useGeneralDataFetch();
  const [currentType, setCurrentType] = useState('');

  useEffect(() => {
    if (currentType) {
      fetchGeneralApiData(currentType);
    }
  }, [currentType, fetchGeneralApiData]);

  const handleClick = useCallback((type) => {
    setCurrentType(type);
  }, []);

  const cardComponents = useMemo(() => ({
    characters: CharacterCard,
    locations: LocationCard,
    organizations: OrganizationCard,
    titans: TitanCard,
    episodes: EpisodeCard,
  }), []);

  const getCardComponent = (data, type) => {
    const Component = cardComponents[type]; // [] is the dynamic version of dot notation
    return Component ? <Component data={data} /> : null;
  };

  if (isLoading) return <LoadingSpinner className="spinner-container" />;
  // if (isLoading) return <SpinnerContainer><Spinner /></SpinnerContainer>;
  if (isError) return <ErrorComponent message={isError} />;
  return (
    <StyledContainer maxWidth="lg" style={{ marginTop: '20px' }}>
      <StyledPaper elevation={3} style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Attack on Titan API</h1>
        <ButtonContainer maxWidth="md" className="btn-container">
          <StyledButton variant="contained" onClick={() => handleClick('characters')}>Characters</StyledButton>
          <StyledButton variant="contained" onClick={() => handleClick('locations')}>Locations</StyledButton>
          <StyledButton variant="contained" onClick={() => handleClick('organizations')}>Organizations</StyledButton>
          <StyledButton variant="contained" onClick={() => handleClick('titans')}>Titans</StyledButton>
          <StyledButton variant="contained" onClick={() => handleClick('episodes')}>Episodes</StyledButton>
        </ButtonContainer>
        <Grid container>
          {generalApiData.results && generalApiData.results.map((data) => (
            <Grid item xs={12} sm={6} md={6} key={data.id}>
              {getCardComponent(data, currentType)}
            </Grid>
          ))}
        </Grid>
      </StyledPaper>
    </StyledContainer>
  );
}

export default App;






// We can also use useCallback to memoize the entire func, but not necessarry here
// const getCardComponent = useCallback((data, type) => {
//   switch (type) {
//     case 'characters':
//       return <CharacterCard data={data} />;
//     case 'titans':
//       return <TitanCard data={data} />;
//     case 'locations':
//       return <LocationCard data={data} />;
//     case 'organizations':
//       return <OrganizationCard data={data} />;
//     case 'episodes':
//       return <EpisodeCard data={data} />;
//     default:
//       return null;
//   }
// }, []);