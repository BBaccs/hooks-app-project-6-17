import React, { useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';

function TitanCard({ data }) {
    const { characterData, showNames, fetchData } = useCharacterDataFetcher();
    const { name, height, abilities, relatives, allegiance, former_inheritors, current_inheritor, id } = data;
    // useEffect(() => {
    //     // Check if current_inheritor is undefined or it will throw an error
    //     if (current_inheritor) {
    //         fetchData(current_inheritor);
    //     }
    // }, [current_inheritor, id]);
    
    useEffect(() => {
        if (former_inheritors) {
            fetchData(former_inheritors);
        }
    }, [former_inheritors, id]);
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
                                <li key={ability}>{ability}</li>
                            ))}
                        </ul>
                    )}
                </Typography>
                <Typography>
                    Loyal to: {allegiance}
                </Typography>
                <Typography>
                    {/* {characterData && characterData.length > 0 && (
                        characterData.map((char) => (
                            <p>Current Inheritor: {char.name}</p>
                        ))
                    )} */}
                    <p><b>Former Inheritors:</b></p>
                    <ul>
                    {characterData && characterData.length > 0 && (
                        characterData.map((char) => (
                            <li>{char.name}</li>
                        ))
                    )}
                    </ul>
                    {console.log(characterData, former_inheritors)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onclick={() => console.log('hi')} size="large">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default TitanCard;



{/* <Typography>
                <Button onClick={() => fetchData(current_inheritor, id)} size="large">{showNames[id] ? 'Hide info' : 'Learn More'}:</Button>
                    {characterData && characterData.length > 0 && (
                        characterData.map((char) => (
                            <p className={showNames[data.id] ? 'show' : 'hide'}>Current Inheritor: {char.name}</p>
                        ))
                    )}
                </Typography> */}
{/* <Typography>
                    Former Inheritor: {console.log(former_inheritors)}
                </Typography> */}