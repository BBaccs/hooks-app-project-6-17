import React, { useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import cleanImageUrl from '../Utilities/cleanImageUrl';
import useCharacterDataFetcher from '../hooks/useCharacterDataFetcher';
import PropTypes from 'prop-types';

function TitanCard({ data }) {
    const { characterData, fetchData } = useCharacterDataFetcher();
    const { name, id, height, abilities, relatives, allegiance, former_inheritors, current_inheritor, img } = data;

    useEffect(() => {
        if (current_inheritor) {
            fetchData(current_inheritor, 'current');
        }
    }, [current_inheritor]);

    useEffect(() => {
        if (former_inheritors) {
            fetchData(former_inheritors, 'former');
        }
    }, [former_inheritors]);

    return (
        <Card key={id} sx={{ maxWidth: 345, marginTop: '40px' }}>
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
                    {relatives && relatives.length > 0 && (
                        <ul>
                            {relatives.map((relative, index) => (
                                <li key={index}>{JSON.stringify(relative.family)}</li>
                            ))}
                        </ul>
                    )}
                </Typography>
                <Typography>
                    Abilities:
                    {abilities && abilities.length > 0 && (
                        <ul>
                            {abilities.map((ability, index) => (
                                <li key={index}>{ability}</li>
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
                </Typography>
            </CardContent>
        </Card>
    );
}

TitanCard.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        abilities: PropTypes.arrayOf(PropTypes.string),
        allegiance: PropTypes.string,
        height: PropTypes.string,
        relatives: PropTypes.arrayOf(PropTypes.shape({
            family: PropTypes.string
        })),
        current_inheritor: PropTypes.string,
        former_inheritors: PropTypes.arrayOf(PropTypes.string),
        img: PropTypes.string
    }).isRequired
};

export default TitanCard;