import styled, { keyframes, css } from 'styled-components';
import { Typography, CardContent, Button, CardActions, CardMedia, Container, Paper, Card } from '@mui/material';

// Define the keyframes for the spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled components
export const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

export const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
`;

export const ButtonContainer = styled(Container)`
  padding: 0px;
  text-align: center;
  margin-bottom: 50px;

  & button {
    margin-left: 5px;
    margin-right: 5px;
  }
`;

export const StyledButton = styled(Button)`
  background-color: black !important;
  color: white !important;
`;

export const Spinner = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 300px;
  height: 300px;
  animation: ${spin} 2s linear infinite;
  transform: translate(-50%, -50%);
`;

export const SpinnerContainer = styled(Container)`
  display: flex !important;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;

export const StyledCard = styled(Card).attrs(() => ({
  sx: { maxWidth: 345 }
}))`
  margin: 10px;
`;

export const StyledTypography = styled(Typography)`
  margin-bottom: 10px;
`;

export const StyledCardContent = styled(CardContent)``;

export const StyledCardActions = styled(CardActions)``;

export const StyledCardMedia = styled(CardMedia)``;

export const StyledOrganizationCard = styled(Card).attrs(() => ({
  sx: { maxWidth: 500 }
}))`
  margin: 10px;
`;

export const StyledTitanCard = styled(Card).attrs(() => ({
  sx: { maxWidth: 345, marginTop: '40px' }
}))``;

export const StyledCharacterCard = styled(Card).attrs(() => ({
  sx: { maxWidth: 345, marginBottom: '50px' }
}))``;

export const StyledEpisodeCard = styled(Card).attrs(() => ({
  sx: { maxWidth: 345 }
}))``;

const showHideStyles = css`
  display: ${({ show }) => (show ? 'block' : 'none')} !important;
`;

export const ToggleableList = styled.ul`
  ${showHideStyles}
`;

export const ToggleableItem = styled.li`
  margin-bottom: 10px;
`;
