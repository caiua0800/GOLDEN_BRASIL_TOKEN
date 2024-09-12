import styled from "styled-components";


export const ExtratoValorizacaoContainer = styled.div`
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
`;


export const ContainerTitle = styled.div`
    width: 100%;
    font-size: 28px;
    font-weight: 600;
    color: #000026;
    transition: .5s;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;


    p{
        margin: 0;
    }

    &:hover{
        padding: 0px 0px 0px 10px;
        color: #ffd100;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
    }

    @media (max-width: 1000px){
        p{
            font-size: 28px;
        }
    }
`;

export const TabelaContainer = styled.div`
    width: 100%;
    max-height: 800px;
    border-collapse: collapse;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: linear-gradient(-60deg, #000000, #2b2d2e, #2b2d2e, #2b2d2e, #000000);

    margin-top: 20px;
    box-shadow: 2px 3px 4px rgba(0,0,0,0.7);

    overflow: auto;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: transparent;
    color: #000;
    font-size: 16px;

    tbody {
        color: #a2d6f9;
        font-weight: 500;
    }

    td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        text-shadow: 1px 2px 1px rgba(0,0,0,0.2);
    }

    th {
        padding: 12px 15px;
        text-align: left;
        color: white;
        font-weight: bold;
        border-bottom: 1px solid #ddd;
    }

    tr {
        &:nth-child(even) {
            background-color: rgba(0,0,0,0.4);
            color: white;
        }

        &:hover {
            background-color: rgba(0,0,0,0.2);
        }
    }

    .value-cell {
        &.contrato {
            color: #6acc1a; /* verde escuro para contrato */
        }

        &.saque {
            color: rgba(255, 0, 100, 1); 
            font-weight: 600;
        }

        &.indicacao {
            color: #6acc1a; /* verde escuro para indicação */
        }
    }
`;

export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    button {
        margin: 0 10px;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;

        &:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }

        &:hover:not(:disabled) {
            background-color: #0056b3;
        }
    }

    span {
        font-size: 16px;
        margin: 0 10px;
    }
`;