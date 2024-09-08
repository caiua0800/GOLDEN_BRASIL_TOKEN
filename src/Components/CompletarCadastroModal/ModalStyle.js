import styled from "styled-components";


export const ModalContainer = styled.div`
    width: 100%;
    z-index: 99999999;
    height: 100vh;
    position: fixed;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    box-sizing: border-box;
`;

export const ModalContent = styled.div`
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: linear-gradient(-70deg, #000000, #1a1c1b, #000000);
    box-shadow: 9px 9px 1px rgba(0,0,0,0.8);
    transition: .3s;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 8px;
    overflow-y: auto;
    position: relative;

    &:hover{
        box-shadow: 6px 6px 1px rgba(0,0,0,0.8);
        transform: sclae(0.97);
        filter: drop-shadow(2px 2px 5px #FFFFFF);
    }

    h1{
        width: 100%;
        text-align: center;
        color: #FFFFFF;
        font-size: 28px;
    }

    @media (max-width: 1000px){
        overflow-x: hidden;
        width: 100%; 
        border-radius: 0;
        height: 100%;
        box-sizing: border-box;
        padding: 80px 40px;
        justify-content: start;
    }
`;

export const LoginBehind = styled.img`
    position: absolute;;
    width: 350px;
    top: 30%; /* Você pode ajustar ou remover esta linha se quiser posicionar verticalmente de outra forma */
    z-index: 1;
    left: 50%;
    opacity: 0.2;
    transform: translateX(-50%); 
    transition: .5s;
`;

export const PrincipalContent = styled.div`
    z-index: 2;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


export const ModalBoxes = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
`;

export const JobSelectorDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    box-sizing: border-box;
    overflow-x: hidden;

    p{
        margin: 0;
        color: rgba(255,255, 255, 0.7);
        font-weight: 800;
    }

    input, select{
        width: 350px;
        box-sizing: border-box;
        height: 30px;
        border: 0;
        padding-left: 20px;
    }

    @media (max-width: 1000px){

        align-items: center;
        input, select{
            width: 250px;
        }
    }
`;

export const ListaProfissoes = styled.ul`
    max-height: 350px;
    overflow: hidden;
    background-color: white;
    list-style: none;
    text-align: center;
    width: 350px;
    margin: 0;
    padding: 0;
    padding: 0 20px;
    box-sizing: border-box;
    overflow-y: scroll;

    li{
        padding: 5px;
        box-sizing: border-box;
        transition: .3s;
        cursor: pointer;
        text-shadow: 2px 2px 1px rgba(0,0,0,0);
        font-weight: 600;

        &:hover{
            padding-left: 2px;
            color: #E6AA3A;
            text-shadow: 1px 1px 1px rgba(0,0,0,0.4);

        }
    }
`;

export const ConfirmDataTitle = styled.h2`
    width: 100%;
    margin-top: 40px;
    color: #FFFFFF;
    text-align: center;
`;

export const ConfirmData = styled.div`
    max-width: 50%;
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;

    div{
        display: flex;
        flex-direction: column;
        gap: 5px;

        span{
            text-align: center;
            color: #E6AA3A;
            font-weight: 500;
        }

        input{
            min-width: 250px;
            max-width: 350px;
            height: 30px;
            border: 0;
            padding-left: 10px;
            box-sizing: border-box;
        }
    }
`;

export const BotaoSalvarDados = styled.button`
    margin-top: 20px;
    width: 350px;
    height: 40px;
    border: 0;
    cursor: pointer;
    transition: .3s;

    &:hover{
        transform: scale(0.97);
    }
`;
