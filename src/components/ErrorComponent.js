import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ErrorComponent = ({ message }) => (
  <Typography color="error" align="center">
    {message}
  </Typography>
);

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorComponent;
