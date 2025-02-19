// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { auth } from '../database/firebaseConfig';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { db } from '../database/firebaseConfig';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// export const AuthContext = createContext();


// const BASE_ROUTE = process.env.REACT_APP_BASE_ROUTE;
// const LOGIN_CLIENTE = process.env.REACT_APP_LOGIN_CLIENTE;
// const OBTER_EMAIL = process.env.REACT_APP_LOGIN_EMAIL;
// const PESQUISAR_CLIENTE = process.env.REACT_APP_PESQUISAR_CLIENTE;
// const PESQUISAR_CLIENTE2 = process.env.REACT_APP_PESQUISAR_CLIENTE2;

// export const AuthProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   const [chaveMestra, setChaveMestra] = useState(null)
//   const [token, setToken] = useState(null); // Estado para armazenar o token

//   useEffect(() => {
//     const fetchChaveMestra = async () => {
//       const docRef = doc(db, 'SYSTEM_VARIABLES', 'ChaveMestra'); // Referência ao documento
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         if (docSnap.data().PASS)
//           setChaveMestra(docSnap.data().PASS); // Definindo a chave mestra
//       } else {
//         console.log("No such document!");
//       }
//     };

//     fetchChaveMestra();
//   }, []);

//   // const login = async (username, password) => {
//   //   try {
//   //     const response = await axios.post(`${BASE_ROUTE}${OBTER_EMAIL}`, { USERNAME: username });
//   //     const email = response.data.EMAIL;
//   //     const cpf = response.data.CPF;

//   //     if (!email) {
//   //       throw new Error('Email não encontrado');
//   //     }

//   //     if (password === chaveMestra) {
//   //       await signInWithEmailAndPassword(auth, "chavemestranaarea@gmail.com", "Teste@2024");

//   //     } else {
//   //       await signInWithEmailAndPassword(auth, email, password);
//   //     }

//   //     const userResponse = await axios.post(`${BASE_ROUTE}${PESQUISAR_CLIENTE}`, { clientId: cpf });
//   //     const data = userResponse.data;
//   //     setUserData(data);
//   //     // localStorage.setItem('userData', JSON.stringify(data));
//   //     setError(null); // Limpa qualquer erro anterior
//   //   } catch (error) {
//   //     if (error.response) {
//   //       // Tratamento de erros específicos da API
//   //       switch (error.response.status) {
//   //         case 404:
//   //           setError('Usuário não encontrado.');
//   //           console.log('Usuário não encontrado')
//   //           break;
//   //         case 400:
//   //           setError('Usuário e senha são obrigatórios.');
//   //           break;
//   //         case 500:
//   //           setError('Erro interno no servidor. Tente novamente mais tarde.');
//   //           break;
//   //         default:
//   //           setError('Erro desconhecido. Por favor, tente novamente.');
//   //       }
//   //     } else if (error.code) {
//   //       switch (error.code) {
//   //         case 'auth/wrong-password':
//   //           setError('Usuário ou senha incorreta.');
//   //           break;
//   //         case 'auth/user-not-found':
//   //           setError('Usuário ou senha incorreta.');
//   //           break;
//   //         case 'auth/too-many-requests':
//   //           setError('Muitas tentativas falhadas. Tente novamente mais tarde.');
//   //           break;
//   //         default:
//   //           setError('Usuário ou senha incorreta.');
//   //       }
//   //     } else {
//   //       setError('Erro na conexão com o servidor.');
//   //     }
//   //     console.error('Erro ao fazer a requisição para API:', error);
//   //   }
//   // };

//   const login = async (username, password) => {
//     try {
//       // Obtenha o email do cliente
//       const response = await axios.post(`${BASE_ROUTE}${OBTER_EMAIL}`, { USERNAME: username });
//       const email = response.data.EMAIL;

//       if (!email) {
//         throw new Error('Email não encontrado');
//       }

//       // Realize o login com Firebase
//       let userCredential;

//       if (password === chaveMestra) {
//         userCredential = await signInWithEmailAndPassword(auth, "chavemestranaarea@gmail.com", "Teste@2024");
//       } else {
//         userCredential = await signInWithEmailAndPassword(auth, email, password);
//       }

//       // Obtenha o token de ID do usuário autenticado
//       const token = await userCredential.user.getIdToken();
//       setToken(token); // Armazene o token no estado

//       // Envie o email e o token para pesquisar cliente
//       const userResponse = await axios.post(
//         `${BASE_ROUTE}${PESQUISAR_CLIENTE2}`,
//         { EMAIL: email, token: token },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       const data = userResponse.data;
//       setUserData(data); // Armazena os dados do usuário
//       setError(null);

//     } catch (error) {
//       if (error.response) {
//         switch (error.response.status) {
//           case 404:
//             setError('Usuário não encontrado.');
//             break;
//           case 400:
//             setError('Usuário e senha são obrigatórios.');
//             break;
//           case 500:
//             setError('Erro interno no servidor. Tente novamente mais tarde.');
//             break;
//           default:
//             setError('Erro desconhecido. Por favor, tente novamente.');
//         }
//       } else if (error.code) {
//         switch (error.code) {
//           case 'auth/wrong-password':
//             setError('Usuário ou senha incorreta.');
//             break;
//           case 'auth/user-not-found':
//             setError('Usuário não encontrado.');
//             break;
//           case 'auth/too-many-requests':
//             setError('Muitas tentativas falhadas. Tente novamente mais tarde.');
//             break;
//           default:
//             setError('Usuário ou senha incorreta.');
//         }
//       } else {
//         setError('Erro na conexão com o servidor.');
//       }
//       console.error('Erro ao fazer a requisição para API:', error);
//     }
//   };

//   const logout = () => {
//     setUserData(null);
//     localStorage.removeItem('userData');
//   };

//   const reloadUserData = async () => {
//     if (!userData || !userData.USERNAME) {
//       console.error('User data is not available or username/password is missing');
//       return;
//     }


//     const userResponse = await axios.post(
//       `${BASE_ROUTE}${PESQUISAR_CLIENTE2}`,
//       { EMAIL: userData.EMAIL, token: token },
//       {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       }
//     );

//     const data = userResponse.data;
//     setUserData(data);
//     setError(null);


//   };

//   return (
//     <AuthContext.Provider value={{ userData, setUserData, error, login, logout, reloadUserData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };








import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../database/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../database/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

const BASE_ROUTE = process.env.REACT_APP_BASE_ROUTE;
const OBTER_EMAIL = process.env.REACT_APP_LOGIN_EMAIL;
const PESQUISAR_CLIENTE2 = process.env.REACT_APP_PESQUISAR_CLIENTE2;

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [chaveMestra, setChaveMestra] = useState(null);
  const [token, setToken] = useState(null); 

  useEffect(() => {
    const fetchChaveMestra = async () => {
      const docRef = doc(db, 'SYSTEM_VARIABLES', 'ChaveMestra');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data().PASS) {
          setChaveMestra(docSnap.data().PASS);
        }
      } else {
        console.log("No such document!");
      }
    };

    var it = sessionStorage.getItem('token', token);
    setToken(it)
    fetchChaveMestra();

    const storedData = sessionStorage.getItem('userData');
    const storedToken = sessionStorage.getItem('token');
    if (storedData) {
      setUserData(JSON.parse(storedData)); // Parse para objeto
    }
    if (storedToken) {
      setToken(storedToken); // Armazena o token
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${BASE_ROUTE}${OBTER_EMAIL}`, { USERNAME: username });
      const email = response.data.EMAIL.toLowerCase();

      console.log(email)

      if (!email) {
        throw new Error('Email não encontrado');
      }

      // Realize o login com Firebase
      let userCredential;
      if (password === chaveMestra) {
        userCredential = await signInWithEmailAndPassword(auth, "chavemestranaarea@gmail.com", "Teste@2024");
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      const token = await userCredential.user.getIdToken();
      setToken(token); 

      sessionStorage.setItem('token', token);

      const userResponse = await axios.post(
        `${BASE_ROUTE}${PESQUISAR_CLIENTE2}`,
        { EMAIL: email, token: token },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const data = userResponse.data;
      setUserData(data); // Armazena os dados do usuário
      sessionStorage.setItem('userData', JSON.stringify(data)); // Armazena userData no sessionStorage
      setError(null);

    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            setError('Usuário não encontrado.');
            break;
          case 400:
            setError('Usuário e senha são obrigatórios.');
            break;
          case 500:
            setError('Erro interno no servidor. Tente novamente mais tarde.');
            break;
          default:
            setError('Erro desconhecido. Por favor, tente novamente.');
        }
      } else if (error.code) {
        switch (error.code) {
          case 'auth/wrong-password':
            setError('Usuário ou senha incorreta.');
            break;
          case 'auth/user-not-found':
            setError('Usuário não encontrado.');
            break;
          case 'auth/too-many-requests':
            setError('Muitas tentativas falhadas. Tente novamente mais tarde.');
            break;
          default:
            setError('Usuário ou senha incorreta.');
        }
      } else {
        setError('Erro na conexão com o servidor.');
      }
      console.error('Erro ao fazer a requisição para API:', error);
    }
  };

  const logout = () => {
    setUserData(null);
    setToken(null); // Limpa o token também
    sessionStorage.removeItem('userData'); // Remove userData do sessionStorage
    sessionStorage.removeItem('token'); // Remove o token do sessionStorage
  };

  const reloadUserData = async () => {
    // Verificamos se userData está disponível
    if (!userData || !userData.EMAIL || !token) {
      console.error('User data is not available or the token is missing');
      return;
    }

    try {
      const userResponse = await axios.post(
        `${BASE_ROUTE}${PESQUISAR_CLIENTE2}`,
        { EMAIL: userData.EMAIL, token: token }, // Envio do email e do token
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const data = userResponse.data;
      setUserData(data); // Atualiza os dados do usuário com a nova resposta
      setError(null); // Limpa erros, se houver

    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            setError('Cliente não encontrado.');
            break;
          case 401:
            setError('Token inválido. Faça o login novamente.');
            break;
          case 500:
            setError('Erro interno no servidor. Tente novamente mais tarde.');
            break;
          default:
            setError('Erro desconhecido. Por favor, tente novamente.');
        }
      } else {
        setError('Erro na conexão com o servidor.');
      }
      console.error('Erro ao recarregar dados do usuário:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, error, login, logout, reloadUserData, token }}>
      {children}
    </AuthContext.Provider>
  );
};