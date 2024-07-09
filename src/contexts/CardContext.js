import React, { createContext, useState, useContext, useMemo } from 'react';

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [currentType, setCurrentType] = useState('');

  const value = useMemo(() => ({ currentType, setCurrentType }), [currentType]);

  return (
    <CardContext.Provider value={value}>
      {children}
      {console.log('CardContext.Provider rendered')}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  return useContext(CardContext);
};