import React, { useCallback, memo } from 'react';
import { useCardContext } from '../contexts/CardContext';
import {
    ButtonContainer,
    StyledButton
} from '../styles/StyledComponents';

const CardPicker = memo(function CardPicker() {
    // console.log('CARDPICKER rendered');
    const { setCurrentType } = useCardContext();

    const handleClick = useCallback((type) => {
        setCurrentType(type);
    }, [setCurrentType]);

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