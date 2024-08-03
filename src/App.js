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
import { LoadProvider } from './context/LoadContext'; // Updated import
import assets from './assets/assets'; // Ensure path is correct
import useImagePreloader from './hooks/useImagePreloader';

function App() {
  // Use the hook to preload images
  useImagePreloader(Object.values(assets));

  return (
    <AuthProvider>
      <LoadProvider> {/* Updated provider */}
        <PulseAnimation />
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="/validacao" element={<PrivateRoute element={Validacao} />} />
            <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
            <Route path="/novacompra" element={<PrivateRoute element={Compra} />} />
            <Route path="/saque" element={<PrivateRoute element={Saque} />} />
            <Route path="/user" element={<PrivateRoute element={ProfilePage} />} />
            <Route path="/noticias" element={<PrivateRoute element={Noticias} />} />
            <Route path="/extrato" element={<PrivateRoute element={Extrato} />} />
          </Routes>
        </Router>
      </LoadProvider> {/* Updated provider */}
    </AuthProvider>
  );
}

export default App;
