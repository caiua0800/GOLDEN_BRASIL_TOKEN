import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import assets from '../../assets/assets';
import * as Styles from './LoginStyle';

const LoginPage = ({ setAparecer }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, error, userData } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  useEffect(() => {
    if (userData) {
      navigate('/dashboard');
    }
  }, [userData, navigate]);

  return (
    <Styles.Container>
      <Styles.LoginBox onSubmit={handleLogin}>
        <Styles.Logo src={assets.imageBrandPlatform} alt="Logo" />
        <Styles.Title>Welcome Back!</Styles.Title>
        <Styles.LoginForm>
          <Styles.Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Styles.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Styles.SubmitButton type="submit">Login</Styles.SubmitButton>
        </Styles.LoginForm>
        {error && (
          <Styles.ErrorPopup>
            <Styles.ErrorMessage>{error}</Styles.ErrorMessage>
            <Styles.ErrorBar />
          </Styles.ErrorPopup>
        )}
      </Styles.LoginBox>
    </Styles.Container>
  );
};

export default LoginPage;
