

import styled from "styled-components";


export const CadastroContainer = styled.div`
  background-color: #202020;
  height: 100vh;
  display: flex;
  padding: 50px 20px;
  box-sizing: border-box;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column;

  position: relative;

  @media (max-width: 1000px){
    padding: 60px 30px;
  }
`;

export const GetBackButton = styled.button`
    border: 0; 
    background-color: rgba(0,0,0,0);
    position: absolute;
    top: 20px; left: 20px;
    font-size: 18px;
    cursor: pointer;

    transition: .3s;

    &:hover{
        color: white;
        transform: scale(1.05);
    }

    @media (max-width: 1000px){
        color: white;
    }
`;

export const CadastroBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CadastroTitle = styled.h1`
    margin: 0;
    filter: drop-shadow(0 0 2px rgba(255, 195, 0, 0.6));
    color: white;
    text-align: center;

    @media (max-width: 1000px){
        font-size: 28px;
        margin-top: 20px;
    }
`;

export const LogoBox = styled.div`
    width: 200px;
    height: 200px;

    img{
        width: 100%;
    }

    @media (max-width: 1000px){
        width: 150px;
        height: 150px;

        img{
            opacity: 0.7;
        }
    }
`;

export const CaixaDeCadastro = styled.div`
    width: 600px;
    didplay: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;

    @media (max-width: 1000px){
        width: 100%;
    }
`;

export const CaixaDeInformacao = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-sizing: border-box;

    h2{
        margin: 0;
        margin-top: 20px;
        width: 100%;
        text-align: start;
        fonr-size: 22px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.7);
    }

    input, select{
        box-sizing: border-box;
        width: 100%;
        padding-left: 20px;
        height: 40px;
        border: 0;
        background-color: white;
        color: rgba(0,0,0,0.7);
        box-shadow: 5px 5px 2px rgba(0,0,0,0.4);
        font-size: 22px;
    }
`;

export const CaixaDeInformacaoLogin = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-sizing: border-box;

    h2{
        margin: 0;
        margin-top: 20px;
        width: 100%;
        text-align: center;
        fonr-size: 22px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.7);
    }

    input, select{
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        border: 0;
        text-align: center;
        background-color: white;
        color: rgba(0,0,0,0.7);
        box-shadow: 5px 5px 2px rgba(0,0,0,0.4);
        font-size: 22px;
    }
`;

export const CaixaDeEscolherSenha = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    box-sizing: border-box;
    margin-top: 20px;

    div{
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;

        span{
            color: white;
        }

        input{
            box-sizing: border-box;
            width: 100%;
            height: 40px;
            margin-top: 5px;
        }
    }
`;

export const CriarCadastro = styled.div`
    width: 100%;
    margin-top: 20px;

    button{
        width: 100%;
        height: 35px;
        border: 0;
        border-radius: 8px;
        background: linear-gradient(to bottom, #749e35, #6acc1a);
        transition: .3s;
        cursor: pointer;

        &:hover{
            transform: scale(0.95);
            color: white
        }
    }

`;

// export const CadastroContainer = styled.div``;

// export const CadastroContainer = styled.div``;

// export const CadastroContainer = styled.div``;
