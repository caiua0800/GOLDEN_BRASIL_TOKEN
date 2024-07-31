import styled, { keyframes } from "styled-components";

// Definir a animação de deslizamento
const slideIn = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
`;

export const CompraContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background: linear-gradient(to right, #d4fcff, #d4fcff, #d4fcff, #d4fcff);
    box-sizing: border-box;
    padding: 50px 30px 400px 30px;
    display: flex;
    flex-direction: column;
    position: relative;
    @media (max-width: 800px) {
        flex-direction: column;
        justify-content: center;
        padding: 60px 10px 100px 10px;
    }
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

export const CompraTitle = styled.div`
    font-size: 18px;
    text-shadow: 3px 4px 1px rgba(0,0,0,0.2);
`;

export const ValorContrato = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        margin: 0;
        font-size: 26px;
        font-weight: 500;
        color: rgba(0,0,0,0.8);
        text-shadow: 2px 4px 2px rgba(0,0,0,0.3);
        span {
            color: rgba(0,0,0,1);
            margin: 0;
        }
    }
`;

export const SelecionarQuantidade = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
`;

export const CustoSemTaxa = styled.div`
    display: flex;
    margin-top: 20px;
    h4 {
        margin: 0;
        color: rgba(8, 55, 182, 0.8);
        text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
    }
    p {
        margin: 0;
        margin-left: 10px;
        font-weight: 600;
    }
`;

export const SimularCompra = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    button {
        height: 40px;
        width: 400px;
        cursor: pointer;
        background: linear-gradient(to right, #b5c806, #e3e902);
        border: 0;
        box-shadow: 3px 3px 2px rgba(0,0,0,0.3);
        transition: .3s;
        &:hover {
            transform: scale(1.05);
        }
    }
`;

export const Simulacao = styled.div`
    width: 100%;
    height: 200px;
`;

export const ResultadoSimulacaoContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 10px;
    gap: 10px;
`;

export const SimulacaoBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 150px;
    background-color: rgba(254, 254, 255, 0.8);
    box-shadow: 3px 3px 2px rgba(0,0,0,0.4);
    gap: 10px;
    p {
        margin: 0;
        font-size: 18px;
        font-weight: 800;
        color: rgba(0,0,0,0.7);
    }
    span {
        margin: 0;
        font-size: 18px;
        font-weight: 800;
        color: rgba(0,0,0,0.7);
    }
`;

export const RealizarCompraBtn = styled.div`
    margin-top: 20px;
    width: 100%;
    button {
        width: 100%;
        cursor: pointer;
        height: 50px;
    }
`;

export const FecharSimulacao = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    span {
        padding-right: 20px;
        color: rgba(0,0,0,0.6);
        cursor: pointer;
        &:hover {
            color: black;
        }
    }
`;

export const BotoesDeValorBox = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: center;
    button {
        width: 100px;
        height: 40px;
        font-size: 16px;
        color: rgba(0,0,0,0.8);
        cursor: pointer;
        font-weight: 600;
        border: 0;
        background: linear-gradient(to right, #a2d6f9, #a2d6f9);
        box-shadow: 3px 3px 2px rgba(0,0,0,0.3);
        transition: .3s;
        &:hover {
            transform: scale(0.95);
        }
    }
`;

export const InputQtt = styled.div`
    display: flex;
    gap: 5px;
    box-sizing: border-box;
    input {
        width: 200px;
        height: 80px;
        background-color: white;
        text-align: center;
        box-shadow: 3px 3px 2px rgba(0,0,0,0.3);
        border: 0;
        font-size: 28px;
    }
    button {
        width: 50px;
        box-shadow: 3px 3px 2px rgba(0,0,0,0.3);
        cursor: pointer;
        border: 2px solid transparent;
        background-color: rgba(69, 162, 255, 0.8);
        transition: .3s;
        &:hover {
            background-color: rgba(69, 150, 60, 0.8);
            border: 2px solid black;
        }
    }
`;

export const CarteiraContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 20px 20px 40px 20px;
    overflow: hidden;
    position: relative;
`;

export const CarteiraIcon = styled.div`
    width: 40px;
    height: 40px;
    overflow: hidden;

    z-index: 1000;
    img {
        width: 100%;
        opacity: 0.6;
        transition: .3s;
        cursor: pointer;
        &:hover {
            opacity: 1;
            transform: scale(0.95);
        }
    }
`;

export const CarteiraInfo = styled.div`
    width: 80%;
    display: flex;
    gap: 10px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0px 4px 8px rgba(0,0,0,0.3);
    padding: 10px;
    animation: ${props => (props.isVisible ? slideIn : 'none')} 0.3s ease-out;
    transform: ${props => (props.isVisible ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease-out;
`;

export const CarteiraInfoBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
    }
`;
