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