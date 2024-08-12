import React, { useEffect, useState } from "react";
import * as S from './ForgotPasswordStyle';
import axios from "axios";
import { auth } from "../../database/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
const email_exists_route = process.env.REACT_APP_EMAIL_EXISTS;
const BASE_ROUTE = process.env.REACT_APP_BASE_ROUTE;

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [responseStatus, setResponseStatus] = useState(null)
    const [responseMessage, setResponseMessage] = useState(null)

    const handleEmailExists = () => {
        // Verifica se o email não está vazio
        if (email.trim() === '') {
            return alert("Insira o email!");
        }

        axios.post(`${BASE_ROUTE}${email_exists_route}`, { EMAIL: email })
            .then(response => {
                console.log("Resposta recebida:");
                console.log(response.data);
                setResponseStatus(response.data.status)
            })
            .catch(error => {
                console.log("Erro ao verificar o email:");
                if (error.response) {
                    setResponseStatus(error.response.status)

                    console.log("Status do erro:", error.response.status);
                    console.log("Dados do erro:", error.response.data);
                } else if (error.request) {
                    console.log("A requisição foi feita, mas não houve resposta:", error.request);
                } else {
                    console.log("Erro na configuração da requisição:", error.message);
                }
            });
    };

    useEffect(() => {
        if (responseStatus != null) {
            switch (responseStatus) {
                case 400:
                    setResponseMessage("Cadastro não encontrado.")
                    break;
                case 401:
                    setResponseMessage("Informe o email para prosseguir");
                    break;
                case 200:
                    setResponseMessage("Um email para redefinir a senha vai ser enviado no seu email.");
                    handleSendEmail()
                    break;
                default:
                    break;
            }
        }
    }, [responseStatus])

    const handleClear = () => {
        setEmail('')
        setResponseStatus(null);
        setResponseMessage(null);
    }

    const handleSendEmail = () => {
        if (email.trim() === '') {
            alert("Insira o email!");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setResponseMessage("Um email para redefinir a senha foi enviado com sucesso.");
                setResponseStatus(200);
            })
            .catch((error) => {
                console.error("Erro ao enviar o email de redefinição de senha:", error);
                setResponseStatus(error.code === 'auth/user-not-found' ? 400 : 500);
                setResponseMessage("Ocorreu um erro ao enviar o email. Tente novamente.");
            });
    };


    return (
        <S.Container>
            <S.GetBack onClick={() => {window.location.href = '/'}}>VOLTAR</S.GetBack>
            <S.BoxCenter>
                <h4>QUAL O EMAIL DE CADASTRO?</h4>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="email"
                    value={email}
                />
                <h6 onClick={() => {window.location.href="/recoverByUsername"}}>Tentar pelo username</h6>
                <button onClick={handleEmailExists}>Buscar</button>
                {responseStatus != null && (
                    <p>{responseMessage} <span onClick={handleClear}>x</span></p>
                )}
            </S.BoxCenter>
        </S.Container>
    )
}