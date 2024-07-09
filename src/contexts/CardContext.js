import React, { createContext, useState, useContext } from 'react';

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [currentType, setCurrentType] = useState('');

  return (
    <CardContext.Provider value={{ currentType, setCurrentType }}>
      {children}
      {console.log('CardContext.Provider.JS')}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  return useContext(CardContext);
};