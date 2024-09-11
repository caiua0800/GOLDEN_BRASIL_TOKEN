import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Compra from './Components/Compra/Compra';
import Saque from './Components/Saque/Saque';
import ProfilePage from './Components/UserPage/UserPage';
import Noticias from './Components/Noticias/Noticias';
import Extrato from './Components/Extrato/Extrato';
import Validacao from './Components/Validacao.js/Validacao';
import PulseAnimation from './Components/Loading/Pulse';
import CadastroPage from './Components/Cadastro/CadastroPage';
import CadastroPageIndicacao from './Components/Cadastro/CadastroPageIndicacao';
import { LoadProvider } from './context/LoadContext'; // Atualizar import
import assets from './assets/assets'; // Certifique-se de que o caminho está correto
import useImagePreloader from './hooks/useImagePreloader';
import Pagina from './Components/ContaDeposito/Pagina';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ForgotPasswordUsername from './Components/ForgotPassword/ForgotPasswordUsername';
import Ajuda from './Components/Ajuda/Ajuda';
import { createGlobalStyle } from 'styled-components';
import Relatorio from './Components/Relatorio/Relatorio';
import ExtratoValorizacao from './Components/ExtratoValorizacao/ExtratoValorizacao';

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #d7dbe0, #c5cdd6, #b3bec9);
    border-radius: 0px;
    // border: 1px solid white;
  }
`;


function App() {
  // Use the hook to preload images
  useImagePreloader(Object.values(assets));

  return (
    <AuthProvider>
      <LoadProvider> {/* Atualizar provider */}
        <PulseAnimation />
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="/cadastroIndicacao" element={<CadastroPageIndicacao />} />
            <Route path="/recover" element={<ForgotPassword />} />
            <Route path="/recoverByUsername" element={<ForgotPasswordUsername />} />
            {/* <Route path="/validacao" element={<PrivateRoute element={Validacao} />} /> */}
            <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
            <Route path="/novacompra" element={<PrivateRoute element={Compra} />} />
            <Route path="/saque" element={<PrivateRoute element={Saque} />} />
            <Route path="/user" element={<PrivateRoute element={ProfilePage} />} />
            <Route path="/noticias" element={<PrivateRoute element={Noticias} />} />
            <Route path="/extrato" element={<PrivateRoute element={Extrato} />} />
            <Route path="/extratovalorizacao" element={<PrivateRoute element={ExtratoValorizacao} />} />
            <Route path="/relatorio" element={<PrivateRoute element={Relatorio} />} />
            {/* <Route path="/ajuda" element={<PrivateRoute element={Ajuda} />} /> */}
            <Route path="/ContaDeDeposito" element={<Pagina />} />
          </Routes>
        </Router>
      </LoadProvider> 
    </AuthProvider>
  );
}

export default App;
