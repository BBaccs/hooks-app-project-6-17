import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';

function TitanCard({ data }) {
    const { isFetching, characterData, showNames, fetchData } = useCharacterDataFetcher();
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        // Function to perform the fetch
        const performFetch = () => {
            if (data.former_inheritors && !isFetching && retryCount < 3) { // Retry up to 3 times
                fetchData(data.former_inheritors);
                console.log('HELLO');
            }
        };

        performFetch(); // Call fetch function

        // If the fetch fails and conditions are still met, schedule a retry
        if (!isFetching && retryCount < 3) {
            const timer = setTimeout(() => {
                setRetryCount(retryCount + 1); // Increment retry count
            }, 2000); // Retry after 2 seconds

            return () => clearTimeout(timer); // Cleanup timeout
        }
    }, [data.former_inheritors, data.characters, isFetching, retryCount]); // Include retryCount in dependencies

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt={data.name || 'No name available'}
                height="140"
                image={cleanImageUrl(data.img)}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {data.name}
                </Typography>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Height: {data.height ? `${data.height} cm` : 'Unknown'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Age: {data.age ? `${data.age} years` : 'Unknown'}
                    </Typography>
                    {data.description && (
                        <Typography variant="body2" color="text.secondary">
                            Description: {data.description}
                        </Typography>
                    )}
                    {data.role && (
                        <Typography variant="body2" color="text.secondary">
                            Role: {data.role}
                        </Typography>
                    )}
                    <Typography>
                        Relatives:
                        {data.relatives && data.relatives.length > 0 ? (
                            <ul>
                                {data.relatives.map((relative, index) => (
                                    <li key={index}>{relative.name} - {relative.relation}</li>
                                ))}
                            </ul>
                        ) : 'No relatives known'}
                    </Typography>
                    <Typography>
                        Abilities:
                        {data.abilities && data.abilities.length > 0 ? (
                            <ul>
                                {data.abilities.map((ability, index) => (
                                    <li key={index}>{ability}</li>
                                ))}
                            </ul>
                        ) : 'No abilities listed'}
                    </Typography>
                    <Typography>
                        Former Inheritor:
                        {data.former_inheritors && data.former_inheritors.length > 0 ? (
                            <ul>
                                {characterData.map((inheritor, index) => (
                                    <li key={index}>{inheritor}</li>
                                ))}
                            </ul>
                        ) : 'No former inheritors'}
                    </Typography>
                </CardContent>

            </CardContent>
            <CardActions>
                <Button onClick={() => console.log('hi')} size="large">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default TitanCard;
