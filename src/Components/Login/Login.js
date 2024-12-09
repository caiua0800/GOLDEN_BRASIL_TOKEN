import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import InfoModal from './InfoModal';
import * as Styles from './LoginStyle';
import { formatNumber } from '../../assets/utils';
import { usePulse } from '../../context/LoadContext';



const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, error, userData, setUserData } = useContext(AuthContext);
  const { showPulse, hidePulse } = usePulse();
  const [closeInfoModal, setCloseInfoModal] = useState(true);

  const [valorInvestimento, setValorInvestimento] = useState(750);


  const handleLogin = async (e) => {

    e.preventDefault();
    showPulse();
    await login(username, password);
    hidePulse();
  };

  // useEffect(() => {
  //   const storedUserData = localStorage.getItem('userData');
  //   if (storedUserData) {
  //     setUserData(JSON.parse(storedUserData))
  //   }
  // }, [])

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        window.location.reload();  
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

    <>
      <Styles.Container>
        {/* {closeInfoModal && (
        <InfoModal setCloseInfoModal={setCloseInfoModal} />
      )} */}
        <Styles.LoginBox onSubmit={handleLogin}>
          <Styles.Logo src='logo-golden.png' alt="Logo" />
          <Styles.Title>Bem vindo!</Styles.Title>
          <Styles.LoginForm>
            <Styles.Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Styles.InputPass>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type='button' onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? <img src='opened-eye.svg' /> : <img src='closed-eye.svg' />}</button>
            </Styles.InputPass>

            <Styles.forgotPassLinky onClick={() => { window.location.href = "/recover" }}>Esqueceu a senha?</Styles.forgotPassLinky>
            <Styles.SubmitButton type="submit">Login</Styles.SubmitButton>
            <Styles.singUpLink>Não possui cadastro? <a onClick={() => { window.location.href = "/cadastro" }}>cadastre-se já</a> </Styles.singUpLink>
          </Styles.LoginForm>
          {showError && (
            <Styles.ErrorPopup>
              <Styles.ErrorMessage>{error}</Styles.ErrorMessage>
              <Styles.ErrorBar />
            </Styles.ErrorPopup>
          )}

        </Styles.LoginBox>
        
          <p className='Arraste'>Role para baixo para fazer uma simulação <img alt='seta para baixo' src='arrow-bottom2.png' /></p>
      </Styles.Container>

      <Styles.SimulacaoContainer>
        <h1>Simule A Valorização do Seu Capital Aqui na Golden Brasil</h1>


        <Styles.SimulationContent>
          <Styles.InputMoney>
            <p>Valor do Investimento</p>
            <input
              type='number'
              min={750}
              max={10000000}
              placeholder="Mínimo de R$750,00"
              value={valorInvestimento}
              onChange={(e) => setValorInvestimento(e.target.value)}
            />
          </Styles.InputMoney>

          <Styles.Results>
            <h3>COM R${formatNumber((valorInvestimento) === 0 ? 0 : valorInvestimento)} DE CAPITAL:</h3>
            <ul>
              <li>R${formatNumber(valorInvestimento * 0.00139998)} Reais De Lucro Diário</li>
              <li>R${formatNumber(valorInvestimento * 0.041)} Reais De Lucro ao Mês</li>
              <li>R${formatNumber(valorInvestimento * 0.5)} Reais De Lucro ao Ano</li>
              <li>Totalizando R${formatNumber(valorInvestimento * 1.5)} Reais De Lucro Final</li>
            </ul>
          </Styles.Results>
        </Styles.SimulationContent>
      </Styles.SimulacaoContainer>
    </>

  );
};

export default LoginPage;
