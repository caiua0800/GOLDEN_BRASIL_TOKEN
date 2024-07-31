import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import PulseAnimation from './Components/PulseAnimation';
import Compra from './Components/Compra/Compra';
import Saque from './Components/Saque/Saque';
import ProfilePage from './Components/UserPage/UserPage';
import Noticias from './Components/Noticias/Noticias';
import Extrato from './Components/Extrato/Extrato';
import Validacao from './Components/Validacao.js/Validacao';

function App() {
  const [aparecer, setAparecer] = useState(false);

  return (
    <AuthProvider>
      <PulseAnimation aparecer={aparecer} />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage setAparecer={setAparecer} />} />
          <Route path="/validacao" element={<PrivateRoute element={Validacao} />} />
          <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
          <Route path="/novacompra" element={<PrivateRoute element={Compra} />} />
          <Route path="/saque" element={<PrivateRoute element={Saque} />} />
          <Route path="/user" element={<PrivateRoute element={ProfilePage} />} />
          <Route path="/noticias" element={<PrivateRoute element={Noticias} />} />
          <Route path="/extrato" element={<PrivateRoute element={Extrato} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
