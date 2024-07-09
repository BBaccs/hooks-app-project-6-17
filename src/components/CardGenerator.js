import React, { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { Grid } from '@mui/material';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorComponent from './components/ErrorComponent';
import CharacterCard from './components/CharacterCard';
import TitanCard from './components/TitanCard';
import LocationCard from './components/LocationCard';
import OrganizationCard from './components/OrganizationCard';
import EpisodeCard from './components/EpisodeCard';
import useGeneralDataFetch from './hooks/useGeneralDataFetch';
import {
    StyledContainer,
    StyledPaper,
    ButtonContainer,
    StyledButton
} from './styles/StyledComponents';

const CardPickerButtons = memo(function App() {
    console.log('App rendered');

    const { generalApiData, isLoading, isError, fetchGeneralApiData } = useGeneralDataFetch();
    const [currentType, setCurrentType] = useState('');

    useEffect(() => {
        if (currentType) {
            console.log(`Fetching data for type: ${currentType}`);
            fetchGeneralApiData(currentType);
        }
    }, [currentType, fetchGeneralApiData]);

    const handleClick = useCallback((type) => {
        console.log(`Button clicked for type: ${type}`);
        setCurrentType(type);
    }, []);

    const cardComponents = useMemo(() => ({
        characters: CharacterCard,
        locations: LocationCard,
        organizations: OrganizationCard,
        titans: TitanCard,
        episodes: EpisodeCard,
    }), []);

    const getCardComponent = useCallback((data, type) => {
        console.log('getCardComponent called');
        const Component = cardComponents[type];
        return Component ? <Component data={data} /> : null;
    }, [cardComponents]);

    if (isLoading) return <LoadingSpinner className="spinner-container" />;
    if (isError) return <ErrorComponent message={isError} />;

    return (
        <>
            <ButtonContainer maxWidth="md" className="btn-container">
                <StyledButton variant="contained" onClick={() => handleClick('characters')}>Characters</StyledButton>
                <StyledButton variant="contained" onClick={() => handleClick('locations')}>Locations</StyledButton>
                <StyledButton variant="contained" onClick={() => handleClick('organizations')}>Organizations</StyledButton>
                <StyledButton variant="contained" onClick={() => handleClick('titans')}>Titans</StyledButton>
                <StyledButton variant="contained" onClick={() => handleClick('episodes')}>Episodes</StyledButton>
            </ButtonContainer>
            <Grid container>
                {generalApiData.results && generalApiData.results.map((data) => (
                    <Grid item xs={12} sm={6} md={6} key={data.id}>
                        {getCardComponent(data, currentType)}
                    </Grid>
                ))}
            </Grid>
        </>
    );
});

export default CardPickerButtons;
