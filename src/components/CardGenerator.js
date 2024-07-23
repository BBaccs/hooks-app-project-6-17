import React, { useEffect, useCallback, useMemo, memo } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorComponent from './ErrorComponent';
import CharacterCard from './CharacterCard';
import TitanCard from './TitanCard';
import LocationCard from './LocationCard';
import OrganizationCard from './OrganizationCard';
import EpisodeCard from './EpisodeCard';
import useGeneralDataFetch from '../hooks/useGeneralDataFetch';
import { useCardContext } from '../contexts/CardContext';
import { Grid } from '@mui/material';

const CardGenerator = memo(function App() {
    const { currentType } = useCardContext();
    const { generalApiData, isLoading, isError, fetchGeneralApiData } = useGeneralDataFetch();

    useEffect(() => {
        if (currentType) {
            fetchGeneralApiData(currentType);
        }
    }, [currentType, fetchGeneralApiData]);


    const cardComponents = useMemo(() => ({
        characters: CharacterCard,
        locations: LocationCard,
        organizations: OrganizationCard,
        titans: TitanCard,
        episodes: EpisodeCard,
    }), []);

    const getCardComponent = (data, type) => {
        console.log('getCardComponent called');
        const Component = cardComponents[type];
        return Component ? <Component data={data} /> : null;
    };

    if (isLoading) return <LoadingSpinner className="spinner-container" />;
    if (isError) return <ErrorComponent message={isError} />;

    return (
        <Grid container>
            {generalApiData.results && generalApiData.results.map((data) => (
                <Grid item xs={12} sm={6} md={6} key={data.id}>
                    {getCardComponent(data, currentType)}
                </Grid>
            ))}
        </Grid>
    );
});

export default CardGenerator;
