import './App.css';
import React, { useEffect, useState } from 'react';
import { Paper, Grid, Button, Container } from '@mui/material';
import CharacterCard from './components/CharacterCard';
import TitanCard from './components/TitanCard';
import LocationCard from './components/LocationCard';
import OrganizationCard from './components/OrganizationCard';
import EpisodeCard from './components/EpisodeCard';
import useGeneralDataFetch from './hooks/useGeneralDataFetch';

function App() {
  const { generalApiData, fetchGeneralApiData } = useGeneralDataFetch();
  const [currentType, setCurrentType] = useState('');

  useEffect(() => {
    if (currentType) {
      fetchGeneralApiData(currentType);
    }
  }, [currentType]);

  const handleClick = (type) => {
    setCurrentType(type); // Trigger the useEffect
  };

  const getCardComponent = (data, type) => {
    switch (type) {
      case 'characters':
        return <CharacterCard data={data} />;
      case 'titans':
        return <TitanCard data={data} />;
      case 'locations':
        return <LocationCard data={data} />;
      case 'organizations':
        return <OrganizationCard data={data} />;
      case 'episodes':
        return <EpisodeCard data={data} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Attack on Titan API</h1>
        <Container maxWidth="md" className='btn-container'>
          <Button variant="contained" onClick={() => handleClick('characters')}>Characters</Button>
          <Button variant="contained" onClick={() => handleClick('locations')}>Locations</Button>
          <Button variant="contained" onClick={() => handleClick('organizations')}>Organizations</Button>
          <Button variant="contained" onClick={() => handleClick('titans')}>Titans</Button>
          <Button variant="contained" onClick={() => handleClick('episodes')}>Episodes</Button>
        </Container>
        <Grid container>
          {generalApiData.results && generalApiData.results.map((data) => (
            <Grid item xs={12} sm={6} md={6} key={data.id}>
              {getCardComponent(data, currentType)}
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}


export default App;
