import React, { createContext, useState, useContext, useCallback } from 'react';

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [currentType, setCurrentType] = useState('');

  // Memoize the setter function to ensure it doesn't change on every render
  const memoizedSetCurrentType = useCallback((type) => {
    setCurrentType(type);
  }, []);

  return (
    <CardContext.Provider value={{ currentType, setCurrentType: memoizedSetCurrentType }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  return useContext(CardContext);
};