import './App.css';
import React, { useEffect, useState } from 'react';
import { Paper, Grid, Button, Container } from '@mui/material';
import CharacterCard from './components/CharacterCard';
import TitanCard from './components/TitanCard';
import LocationCard from './components/LocationCard';
import OrganizationCard from './components/OrganizationCard';
import EpisodeCard from './components/EpisodeCard';

function App() {
  const baseUrl = {
    "characters": "https://api.attackontitanapi.com/characters",
    "locations": "https://api.attackontitanapi.com/locations",
    "organizations": "https://api.attackontitanapi.com/organizations",
    "titans": "https://api.attackontitanapi.com/titans",
    "episodes": "https://api.attackontitanapi.com/episodes"
  }

  const [apiData, setData] = useState({ results: [] });
  const [dataType, setDataType] = useState('characters');

  async function fetchData(param = 'characters') {
    const url = baseUrl[param];
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log('error');
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const apiData = await response.json();
      setData(apiData);
      setDataType(dataType);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  useEffect(() => {
    fetchData(dataType);
  }, [dataType]);

  const getCardComponent = (data) => {
    switch (dataType) {
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
      // default:
      //   return <CharacterCard data={data} />; // Default case
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Attack on Titan API</h1>
        <Container maxWidth="md" className='btn-container'>
          <Button variant="contained" onClick={() => setDataType('characters')}>Characters</Button>
          <Button variant="contained" onClick={() => setDataType('locations')}>Locations</Button>
          <Button variant="contained" onClick={() => setDataType('organizations')}>Organizations</Button>
          <Button variant="contained" onClick={() => setDataType('titans')}>Titans</Button>
          <Button variant="contained" onClick={() => setDataType('episodes')}>Episodes</Button>
        </Container>
        <Grid container>
          {apiData.results.map((data, index) => (
            <Grid item xs={12} sm={6} md={6} key={data.id}>
              {getCardComponent(data)}
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;
