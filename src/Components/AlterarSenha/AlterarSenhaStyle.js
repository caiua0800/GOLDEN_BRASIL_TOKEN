import styled from "styled-components";

export const AlterarSenhaContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    // background: linear-gradient(to right, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF);
    background-image: url('textura.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    box-sizing: border-box;
    padding: 50px 30px 200px 30px;
    display: flex;
    flex-direction: column;

    @media (max-width: 1000px){
        flex-direction: column;
        justify-content: center;
        padding: 40px 20px 100px 20px;
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

    h1{
        width: 100%;
        text-align: center;
        color: black;
        font-size: 28px;

    }
`;


export const AlterarContent = styled.div`
    margin-top: 40px;
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    display: flex;

    button{
        width: 100%;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        height: 40px;
        border: 4px solid transparent;
        background-color: rgba(80, 255, 20, 1);
        cursor: pointer;
        transition: .3s;

        &:hover{
            transform: scale(1.01);
        }
    }
`;

export const InputDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    gap: 5px;

    input{
        border: 3px solid transparent;
        width: 100%;
        box-shadow: 3px 3px 4px rgba(0,0,0,0.6);
        height: 40px;
        box-sizing: border-box;
        padding-left: 20px;
        background-color: rgba(244, 234, 244, 1);
    }
`;