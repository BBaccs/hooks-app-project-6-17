import React, { createContext, useContext, useState, useMemo } from 'react';

const CardContext = createContext();

export const useCardContext = () => {
    return useContext(CardContext);
};

export const CardProvider = ({ children }) => {
    const [currentType, setCurrentType] = useState('');
    const [generalCache, setGeneralCache] = useState({});
    const [episodeCache, setEpisodeCache] = useState({});

    const value = useMemo(() => ({
        currentType,
        setCurrentType,
        generalCache,
        setGeneralCache,
        episodeCache,
        setEpisodeCache
    }), [currentType, generalCache, episodeCache]);

    return (
        <CardContext.Provider value={value}>
            {children}
        </CardContext.Provider>
    );
};
