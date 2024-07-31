// src/components/UserInfoBox/UserInfoBox.js
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Ajuste o caminho conforme necessário
import * as Styles from './UserInfoBoxStyle'; // Ajuste o caminho conforme necessário

const UserInfoBox = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Styles.Box>
      <Styles.Info>
        <p>{user?.email}</p>
        <button onClick={logout}>Logout</button>
      </Styles.Info>
    </Styles.Box>
  );
};

export default UserInfoBox;
