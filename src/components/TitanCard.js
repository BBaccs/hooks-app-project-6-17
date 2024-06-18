import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';

function TitanCard({ data }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt={data.name}
                height="140"
                image={data.img}
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
                    {data.relatives && data.relatives[0] && JSON.stringify(data.relatives[0].family)}
                </Typography>
                <Typography>
                    Abilities:
                    {data.abilities && data.abilities.length > 0 && (
                        <ul>
                            {data.abilities.map((ability) => (
                                <li key={ability}>{ability}</li>
                            ))}
                        </ul>
                    )}
                </Typography>
                <Typography>
                    Former Inheritor: {console.log(data.former_inheritors)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onclick={() => console.log('hi')} size="large">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default TitanCard;