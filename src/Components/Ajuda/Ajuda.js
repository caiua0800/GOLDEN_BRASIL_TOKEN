import React, { useState, useEffect } from "react";
import * as S from './AjudaStyle'
import SideBarBox from "../Sidebar/SideBarBox";

export default function Ajuda() {

    const [response, setResponse] = useState("null")
    const [erroNaPlataforma, setErroNaPlataforma] = useState("")
    const [outrosPlataforma, setOutrosNaPlataforma] = useState("")

    return (
        <SideBarBox>
            <S.AjudaContainer>
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
                        {handleResult(response, erroNaPlataforma, setErroNaPlataforma, outrosPlataforma, setOutrosNaPlataforma)}
                    </S.ResponseBoxContainer>
                </S.AjudaContent>
            </S.AjudaContainer>
        </SideBarBox>

    )
}

export function handleResult(result, erroNaPlataforma, setErroNaPlataforma, outrosPlataforma, setOutrosNaPlataforma) {


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
                        <button>Reportar</button>
                    )}
                </S.ResponseBoxContent>
            )
        case "OUTROS":
            return (
                <S.ResponseBoxContent>
                    <span>Nos informe qual o problema.</span>
                    <textarea placeholder="Digite aqui..." value={outrosPlataforma} onChange={(e) => setOutrosNaPlataforma(e.target.value)} />
                    {outrosPlataforma != "" && (
                        <button>Enviar</button>
                    )}
                </S.ResponseBoxContent>
            )
        default:
            return null;
    }
}