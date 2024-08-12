import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import assets from '../../assets/assets';
import * as Styles from './LoginStyle';
import { usePulse } from '../../context/LoadContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { login, error, userData } = useContext(AuthContext);
  const { showPulse, hidePulse } = usePulse();

  const handleLogin = async (e) => {
    e.preventDefault();
    showPulse();
    await login(username, password);
    hidePulse();
  };

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (userData) {
      hidePulse();
      navigate('/dashboard');
    }
  }, [userData, navigate, hidePulse]);

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
          <Styles.forgotPassLinky onClick={() => {window.location.href="/recover"}}>Esqueceu a senha?</Styles.forgotPassLinky>
          <Styles.SubmitButton type="submit">Login</Styles.SubmitButton>
          <Styles.singUpLink>Não possui cadastro? <a onClick={() => {window.location.href="/cadastro"}}>cadastre-se já</a> </Styles.singUpLink>
        </Styles.LoginForm>
        {showError && (
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
