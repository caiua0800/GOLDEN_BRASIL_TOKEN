import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ element: Element }) => {
  const { userData } = useContext(AuthContext);

  return userData ? <Element /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
