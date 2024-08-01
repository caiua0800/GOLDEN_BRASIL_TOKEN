// src/context/LoadContext.js
import React, { createContext, useState, useContext } from 'react';

const LoadContext = createContext();

export const LoadProvider = ({ children }) => {
  const [isPulseVisible, setIsPulseVisible] = useState(false);

  const showPulse = () => setIsPulseVisible(true);
  const hidePulse = () => setIsPulseVisible(false);

  return (
    <LoadContext.Provider value={{ isPulseVisible, showPulse, hidePulse }}>
      {children}
    </LoadContext.Provider>
  );
};

export const usePulse = () => useContext(LoadContext);
