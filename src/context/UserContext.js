// src/context/UserContext.js

import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cpf, setCpf] = useState('');

  return (
    <UserContext.Provider value={{ user, setUser, cpf, setCpf }}>
      {children}
    </UserContext.Provider>
  );
};
