import React, { useState, useContext } from "react";
import * as S from './AjudaStyle'
import SideBarBox from "../Sidebar/SideBarBox";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { usePulse } from "../../context/LoadContext";

const BASE = process.env.REACT_APP_BASE_ROUTE;
const ROUTE = process.env.REACT_APP_ADD_REPORT;

export default function Ajuda() {
    const { showPulse, hidePulse } = usePulse();
    const [response, setResponse] = useState("null")
    const [erroNaPlataforma, setErroNaPlataforma] = useState("")
    const [outrosPlataforma, setOutrosNaPlataforma] = useState("")
    const { userData, reloadUserData } = useContext(AuthContext);

    const handleReport = async () => {
        showPulse()
        try {
            var typeReport = 0;
            var sendableMessage = "";

            if (response === "RELATAR UM ERRO NA PLATAFORMA") {
                typeReport = 1;
                sendableMessage = erroNaPlataforma;
                setErroNaPlataforma("");
            } else if (response === "OUTROS") {
                typeReport = 2;
                sendableMessage = outrosPlataforma;
                setOutrosNaPlataforma("");
            }


            var sendableData = {
                TYPE: typeReport,
                MESSAGE: sendableMessage,
                CLIENT_REPORTER: userData.NAME,
                CLIENT_REPORTER_CPF: userData.CPF,
                CLIENT_REPORTER_CONTACT: userData.CONTACT || "Não Informado",
            }

            axios.post(`${BASE}${ROUTE}`, {sendableData}).then((res) => {
                hidePulse();
                alert(res.data);
            }).catch(error => {
                hidePulse();
                alert(error.message);
            })

        } catch (err) {
            alert(err.message);
            console.log(err);
            hidePulse();
        }
    }

    const handleOpenWhatsapp = () => {
        const phoneNumber = '5517992562727'; // Número de telefone no formato internacional
        const message = 'Olá, estou precisando de ajuda com a plataforma!'; // Mensagem pré-definida (opcional)
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank'); 
    };
    

    return (
        <SideBarBox>
            <S.AjudaContainer>
                <S.WhatsAppIcon onClick={handleOpenWhatsapp} src="whatsapp-icon.svg"/>
                <S.LoginBehind src="logo-golden.png" />
                <S.AjudaTitle>ATENDIMENTO DE DÚVIDAS</S.AjudaTitle>

                <S.AjudaContent>
                    <S.AjudaContentTitle>Com o que precisa de ajuda?</S.AjudaContentTitle>

                    <S.SelectionHelp value={response} onChange={(e) => { setResponse(e.target.value); setErroNaPlataforma(""); setOutrosNaPlataforma("") }}>
                        <S.OptionHelp value="null">SELECIONE</S.OptionHelp>
                        <S.OptionHelp value="COMPRA DE CONTRATOS">COMPRA DE CONTRATOS</S.OptionHelp>
                        <S.OptionHelp value="SAQUE">SAQUE</S.OptionHelp>
                        <S.OptionHelp value="INFORMAÇÕES DA PLATAFORMA">INFORMAÇÕES DA PLATAFORMA</S.OptionHelp>
                        <S.OptionHelp value="RELATAR UM ERRO NA PLATAFORMA">RELATAR UM ERRO NA PLATAFORMA</S.OptionHelp>
                        <S.OptionHelp value="OUTROS">OUTROS</S.OptionHelp>
                    </S.SelectionHelp>

                    <S.ResponseBoxContainer>
                        {handleResult(userData, response, erroNaPlataforma, setErroNaPlataforma, outrosPlataforma, setOutrosNaPlataforma, handleReport)}
                    </S.ResponseBoxContainer>
                </S.AjudaContent>
            </S.AjudaContainer>
        </SideBarBox>

    )
}

export function handleResult(userData, result, erroNaPlataforma, setErroNaPlataforma, outrosPlataforma, setOutrosNaPlataforma, handleReport) {


    switch (result) {
        case "null":
            return null;
        case "COMPRA DE CONTRATOS":
            return (

                <S.ResponseBoxContent>
                    <p>Acesse o link <a target="blank" href="https://www.youtube.com/">clicando aqui</a> para assistir um vídeo de como fazer uma compra.</p>

                </S.ResponseBoxContent>
            );
        case "SAQUE":
            return (

                <S.ResponseBoxContent>
                    <p>Acesse o link <a target="blank" href="https://www.youtube.com/">clicando aqui</a> para assistir um vídeo de como realizar um saque.</p>

                </S.ResponseBoxContent>
            );
        case "INFORMAÇÕES DA PLATAFORMA":
            return (
                <S.ResponseBoxContent>
                    <p>Veja um vídeo informativo sobre a plataforma  <a target="blank" href="https://www.youtube.com/">clicando aqui</a>.</p>
                </S.ResponseBoxContent>
            );

        case "RELATAR UM ERRO NA PLATAFORMA":
            return (
                <S.ResponseBoxContent>
                    <span>Nos informe qual o erro.</span>
                    <textarea placeholder="Digite aqui..." value={erroNaPlataforma} onChange={(e) => setErroNaPlataforma(e.target.value)} />
                    {erroNaPlataforma != "" && (
                        <button onClick={handleReport}>Reportar</button>
                    )}
                </S.ResponseBoxContent>
            )
        case "OUTROS":
            return (
                <S.ResponseBoxContent>
                    <span>Nos informe qual o problema.</span>
                    <textarea placeholder="Digite aqui..." value={outrosPlataforma} onChange={(e) => setOutrosNaPlataforma(e.target.value)} />
                    {outrosPlataforma != "" && (
                        <button onClick={handleReport}>Enviar</button>
                    )}
                </S.ResponseBoxContent>
            )
        default:
            return null;
    }
}