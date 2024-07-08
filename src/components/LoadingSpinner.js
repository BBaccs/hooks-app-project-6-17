import React from 'react';
import { Container } from '@mui/material';
import '../App.css';

const LoadingSpinner = () => (
  <Container className="spinner-container">
    <div className="spinner"></div>
  </Container>
);

export default LoadingSpinner;