import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Container } from '@mui/material';

const ErrorComponent = ({ message }) => (
  <Container style={{ textAlign: 'center', marginTop: '20px' }}>
    <Typography variant="h6" color="error">
      {message}
    </Typography>
    <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
      Retry
    </Button>
  </Container>
);

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorComponent;