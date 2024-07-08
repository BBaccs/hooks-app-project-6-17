import React from 'react';
import {
  Spinner,
  SpinnerContainer
} from '../styles/StyledComponents';

const LoadingSpinner = () => (
  <SpinnerContainer>
    <Spinner></Spinner>
  </SpinnerContainer>
);

export default LoadingSpinner;