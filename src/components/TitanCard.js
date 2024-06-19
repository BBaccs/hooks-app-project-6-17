import React, { useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';

function TitanCard({ data }) {
    const { characterData, fetchSingleData, formerInheritorName, isFetching } = useCharacterDataFetcher();

    useEffect(() => {
        if (data.current_inheritor && !isFetching) { 
            fetchSingleData(data.current_inheritor);
        }
    }, [data.current_inheritor, isFetching, fetchSingleData]);

    useEffect(() => {
        if (data.former_inheritors && !isFetching) { 
            fetchSingleData(data.former_inheritors);
        }
        console.log('Former Inheritors URL:', data.former_inheritors);
        console.log('HELLO', characterData);
    }, [data.former_inheritors, isFetching, fetchSingleData]);

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt={data.name || "No Image"}
                height="140"
                image={cleanImageUrl(data.img)}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Height: {data.height}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Age: {data.age}
                </Typography>
                <Typography>
                    Relatives: {data.relatives && data.relatives[0] && JSON.stringify(data.relatives[0].family)}
                </Typography>
                <Typography>
                    Abilities:
                    {data.abilities && (
                        <ul>
                            {data.abilities.map((ability, index) => (
                                <li key={index}>{ability}</li>
                            ))}
                        </ul>
                    )}
                </Typography>
                <Typography>
                    Inheritor: {formerInheritorName || "Loading..."}
                </Typography>
                <Typography>
                    Previous InheritorS: {previousInheritorName || "Loading..."}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => console.log('TEST')} size="large">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default TitanCard;
