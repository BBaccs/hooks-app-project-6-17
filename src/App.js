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
  const [isFetching, setIsFetching] = useState(true);

  async function fetchData2(param = 'characters') {
    const url = baseUrl[param];
    setIsFetching(true);
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
    finally {
      setIsFetching(false);
      console.log(2, isFetching)
    }
  }

  useEffect(() => {
    fetchData2(dataType);
  }, [dataType]);

  const getCardComponent = (data) => {
    const props = { data, isFetching };
  
    switch (dataType) {
      case 'characters':
        return <CharacterCard {...props} />;
      case 'titans':
        return <TitanCard {...props} />;
      case 'locations':
        return <LocationCard {...props} />;
      case 'organizations':
        return <OrganizationCard {...props} />;
      case 'episodes':
        return <EpisodeCard {...props} />;
      // default:
      //   return <CharacterCard {...props} />;
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
