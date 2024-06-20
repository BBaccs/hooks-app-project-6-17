import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';

function TitanCard({ data }) {
    const { characterData, showNames, fetchData } = useCharacterDataFetcher();
    const { name, height, abilities, relatives, allegiance, former_inheritors, current_inheritor, id } = data;

    useEffect(() => {
        // Check if current_inheritor is undefined or it will throw an error
        if (current_inheritor) {
            // console.log(current_inheritor)
            fetchData(current_inheritor, id, 'current');
        }
    }, [current_inheritor]);

    useEffect(() => {
        if (former_inheritors) {
            fetchData(former_inheritors, id, 'former');
        }
    }, [former_inheritors]);
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt=""
                height="140"
                image={cleanImageUrl(data.img)}
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
                            <p key={char[0].id}>Current Inheritor: {char[0].name}</p>
                        ))
                    )}
                </Typography>
                {/* <Typography>
                    <p><b>Former Inheritors:</b></p>
                    <ul>
                        {characterData && characterData.length > 0 && (
                            characterData.map((char) => (
                                <li key={char.id}>{char.name}</li>
                            ))
                        )}
                    </ul>
                </Typography> */}

            </CardContent>
        </Card>
    );
}

export default TitanCard;