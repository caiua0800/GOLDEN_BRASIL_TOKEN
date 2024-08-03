import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Recuperar dados do localStorage ao iniciar o aplicativo
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const login = (username, password) => {
    const LoginSendableData = {
      USERNAME: username,
      PASSWORD: password,
    };

    return axios.post('http://localhost:4000/clientes/loginCliente', LoginSendableData)
      .then((response) => {
        console.log('Usuário Logado:', response.data.NAME);
        const data = response.data;
        setUserData(data);
        localStorage.setItem('userData', JSON.stringify(data)); // Armazenar dados no localStorage
        setError(null);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            setError('Usuário não encontrado.');
          } else if (error.response.status === 401) {
            setError('Senha inválida.');
          } else if (error.response.status === 400) {
            setError('Usuário e senha são obrigatórios.');
          } else if (error.response.status === 500) {
            setError('Erro interno no servidor. Tente novamente mais tarde.');
          } else {
            setError('Erro desconhecido. Por favor, tente novamente.');
          }
        } else {
          setError('Erro na conexão com o servidor.');
        }
        console.log('Erro ao fazer a requisição para API:', error);
      });
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('userData'); 
  };

  const reloadUserData = () => {
    if (!userData || !userData.USERNAME || !userData.PASSWORD) {
      console.error('User data is not available or username/password is missing');
      return;
    }

    const LoginSendableData = {
      CPF: userData.CPF,
    };

    return axios.post('http://localhost:4000/clientes/pesquisarCliente', LoginSendableData)
      .then((response) => {
        const data = response.data;
        setUserData(data);
        localStorage.setItem('userData', JSON.stringify(data)); // Atualizar dados no localStorage
        setError(null);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            setError('Usuário não encontrado.');
          } else if (error.response.status === 401) {
            setError('Senha inválida.');
          } else if (error.response.status === 400) {
            setError('Usuário e senha são obrigatórios.');
          } else if (error.response.status === 500) {
            setError('Erro interno no servidor. Tente novamente mais tarde.');
          } else {
            setError('Erro desconhecido. Por favor, tente novamente.');
          }
        } else {
          setError('Erro na conexão com o servidor.');
        }
        console.log('Erro ao fazer a requisição para API:', error);
      });
  };

  return (
    <AuthContext.Provider value={{ userData, error, login, logout, reloadUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
