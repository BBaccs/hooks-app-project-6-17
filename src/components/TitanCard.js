import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';

function TitanCard({ data }) {
    const { characterData, showNames, fetchData } = useCharacterDataFetcher();
    const { name, id, height, abilities, relatives, allegiance, former_inheritors, current_inheritor, img } = data;

    useEffect(() => {
        // Check if current_inheritor is undefined or it will throw an error
        if (current_inheritor) {
            fetchData(current_inheritor, id, 'current');
        }
    }, [current_inheritor]);

    useEffect(() => {
        if (former_inheritors) {
            fetchData(former_inheritors, id, 'former');
        }
    }, [former_inheritors]);
    return (
        <Card sx={{ maxWidth: 345, marginTop: '40px' }}>
            <CardMedia
                component="img"
                alt=""
                height="140"
                image={cleanImageUrl(img)}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Height: {height}
                </Typography>
                <Typography>
                    {relatives && relatives[0] && JSON.stringify(relatives[0].family)}
                </Typography>
                <Typography>
                    Abilities:
                    {abilities && abilities.length > 0 && (
                        <ul>
                            {abilities.map((ability) => (
                                <li key={ability.id}>{ability}</li>
                            ))}
                        </ul>
                    )}
                </Typography>
                <Typography>
                    Loyal to: {allegiance}
                </Typography>
                <Typography>
                    {characterData.current && characterData.current.length > 0 && (
                        characterData.current.map((char) => (
                            <Typography key={char.id}>Current Inheritor: {char.name}</Typography>
                        ))
                    )}
                </Typography>
                <Typography>
                    <p><b>Former Inheritors:</b></p>
                    <ul>
                        {characterData.former && characterData.former.length > 0 && (
                            characterData.former.map((char) => (
                                <li key={char.id}>{char.name}</li>
                            ))
                        )}
                    </ul>
                    {console.log(characterData)}
                </Typography>

            </CardContent>
        </Card>
    );
}

export default TitanCard;