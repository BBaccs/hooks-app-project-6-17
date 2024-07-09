import React, { memo } from 'react';
import CardPicker from './components/CardPicker';
import CardGenerator from './components/CardGenerator';
import { CardProvider } from './contexts/CardContext';
import {
  StyledContainer,
  StyledPaper
} from './styles/StyledComponents';

const App = memo(function App() {
  console.log('App rendered');


  async function fetchData(url) {
    try {
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      let data = await response.json();

      console.log(data, data.results[0].name);
      return data;

    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  // Example usage
  fetchData('http://localhost:3000/db');

  return (
    <StyledContainer maxWidth="lg" style={{ marginTop: '20px' }}>
      <StyledPaper elevation={3} style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Attack on Titan API</h1>
        <CardProvider>
          <CardPicker />
          <CardGenerator />
        </CardProvider>
      </StyledPaper>
    </StyledContainer>
  );
});

export default App;