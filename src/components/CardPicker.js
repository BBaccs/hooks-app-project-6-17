import React, { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentType } from '../actionCreators';
import {
    ButtonContainer,
    StyledButton
} from '../styles/StyledComponents';

const CardPicker = memo(function CardPicker() {
    console.log('CARDPICKER rendered');
    const dispatch = useDispatch();

    const handleClick = useCallback((type) => {
        dispatch(setCurrentType(type));
    }, [dispatch]);

    return (
        <ButtonContainer maxWidth="md" className="btn-container">
            <StyledButton variant="contained" onClick={() => handleClick('characters')}>Characters</StyledButton>
            <StyledButton variant="contained" onClick={() => handleClick('locations')}>Locations</StyledButton>
            <StyledButton variant="contained" onClick={() => handleClick('organizations')}>Organizations</StyledButton>
            <StyledButton variant="contained" onClick={() => handleClick('titans')}>Titans</StyledButton>
            <StyledButton variant="contained" onClick={() => handleClick('episodes')}>Episodes</StyledButton>
        </ButtonContainer>
    );
});

export default CardPicker;
