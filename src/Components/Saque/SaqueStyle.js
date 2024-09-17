import styled from "styled-components";

export const SaqueContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background-image: url('textura.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;
    padding: 50px 30px 200px 30px;
    display: flex;
    flex-direction: column;
    position: relative;
    @media (max-width: 800px) {
        flex-direction: column;
        justify-content: center;
        padding: 60px 10px 100px 10px;
    }
`;


export const LoginBehind = styled.img`
    position: fixed;
    width: 350px;
    top: 30%; /* Você pode ajustar ou remover esta linha se quiser posicionar verticalmente de outra forma */
    z-index: 1;
    left: 50%;
    opacity: 0.5;
    transform: translateX(-50%); /* Isso centraliza a imagem horizontalmente */
`;

export const PrincipalContent = styled.div`
    z-index: 2;
`;

export const BtnSidebar = styled.button`

    position: fixed;
    top: 50px;
    right: 50px;
    z-index: 9999;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 2px solid black;
    border-radius: 3px;
    cursor: pointer;
    transition: .3s;
    box-shadow: 3px 3px 3px rgba(0,0,0,0.6);
    &:hover{
        transform: scale(1.1);
    }

    img{
        z-index: 9999
        width: 100%;
        height: 100%;
    }
`;

export const SaqueTitle = styled.div`
    font-size: 18px;
    text-shadow: 3px 4px 1px rgba(0,0,0,0.2);
`;

export const SaqueBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const WalletIcon = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    box-shadow: 3px 3px 2px rgba(0,0,0,0.4);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 10px;
    // background-color: rgba(0,0,0,0.05);
    background: linear-gradient(-60deg, #B17D2A, #B17D2A, #E6AA3A, #B17D2A, #B17D2A);

    transition: .3s;
    img {
        width: 90%;
        transition: .3s;
    }

    &:hover {
        background-color: rgba(0,0,0,0.1);
        img {
            transform: scale(0.95);
        }
    }
`;

export const SaqueBoxTitle = styled.p`
    margin: 0;
    margin-top: 10px;
    font-size: 28px;
    color: r#000000;
    text-shadow: 3px 3px 1px rgba(0,0,0,0.1);
`;

export const CentralizeWallet = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const WalletValues = styled.div`
    width: 100%;
    max-width: 600px; 
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Duas colunas para a primeira linha */
    grid-template-rows: repeat(2, auto); /* Duas linhas, ajuste conforme necessário */
    gap: 10px; /* Espaçamento entre os itens */
    margin-top: 20px; /* Espaçamento acima do WalletValues */
    
    /* Estilo adicional para garantir o alinhamento correto na segunda linha */
    & > div:nth-child(3) {
        grid-column: span 2; /* A quarta div ocupa a largura total na segunda linha */
    }

    & > div:nth-child(4) {
        grid-column: span 2; /* A quarta div ocupa a largura total na segunda linha */
    }

    & > div:nth-child(5) {
        grid-column: span 2; /* A quarta div ocupa a largura total na segunda linha */
    }
    & > div:nth-child(8) {
        grid-column: span 2; /* A quarta div ocupa a largura total na segunda linha */
    }
`;

export const WalletValue = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 3px 3px 2px rgba(0,0,0,0.2);
    border-radius: 5px;
    h2 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
    }
    h6{
        margin: 0;
        font-weight: 500;    
        color: rgba(0,0,0,0.7);
    }
    span {
        font-size: 18px;
        font-weight: 500;
        color: rgba(0,0,0,0.8);
    }
`;

export const RealizarSaqueBtn = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button{
        width: 100%;
        height: 40px;
        border: 0;
        box-shadow: 3px 3px 2px rgba(0,0,0,0.2);
        background: linear-gradient(to right, #95e214, #b8f500, #95e214);
        cursor: pointer;
        transition: .3s;

        &:hover{
            background: linear-gradient(to right, #95e214, #b8f500, #95e214);
            transform: scale(0.97);
        }
    }
`;

export const DiasDeSaque = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h2{
        margin: 0;
        font-weight: 600;
        font-size: 18px;
        color: rgba(100, 155, 100, 1);
        text-shadow: 2px 2px 1px rgba(0,0,0,0.2);
        border-bottom: 2px solid rgba(100, 155, 100, 1);
        width: 100%;
        text-align: center;
    }

    .diasContainer{
        width: 100%;
        display: flex;
        justify-content: center
    }
`;

export const Dia = styled.div`
    width: 100%;
    text-align: center;

    span{
        color: rgba(0,0,0,0.8);
        font-size: 16px;
        font-weight: 600;
    }
`;

export const InformacoesSobreSaque = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    box-sizing: border-box;
    padding: 15px;
    opacity: 0.7;
    background: linear-gradient(-70deg, #1e96fc, #a2d6f9, #1e96fc);
    box-shadow: 8px 8px 1px rgba(0,0,0,0.5);
    transition: .3s;
  

    &:hover{
        opacity: 0.9;
    }

    p{
        margin: 0;
        text-align: justify;
        color: rgba(0,0,0,1);
    }

    span{
        font-weight: 600;
    }
`;

export const NaoSaque = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button{
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        box-shadow: 3px 3px 2px rgba(0,0,0,0.2);
        background: linear-gradient(to right, #B17D2A, #E6AA3A, #ffc300, #E6AA3A, #B17D2A);
        cursor: pointer;
        transition: .3s;
        color: black;
        font-weight: 800;
        font-size: 22px;
        text-shadow: 1px 1px 0px white;
    

        &:hover{
             background: linear-gradient(-60deg, #ffd60a, #ffd60a, #ffee32, #B17D2A, #B17D2A);
            transform: scale(0.97);
            text-shadow: 1px 1px 0px black
            color: white;

        }

        img{
            width: 20px;
        }
    }
`;

export const TabelaDeSaquesTitle = styled.h1`
    margin: 0;
    margin-top: 40px;
`;



