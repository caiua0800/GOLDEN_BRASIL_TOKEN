import React from "react";
import styled from "styled-components";



export default function Pagina() {


    return (
        <PaginaContainer>

            <Dados>
                <h2>Conta para Depósito</h2>
                <p>PIX (CNPJ): <span>42007698000117</span></p>
                <p>Agência: <span>1342</span></p>
                <p>Conta: <span>12720-5</span></p>
                <p>Banco: <span>Banco Bradesco S.A.</span></p>
                <p>Beneficiário: <span>Holding Golden Brasil S/A.</span></p>
            </Dados>

        </PaginaContainer>
    )
}

const PaginaContainer = styled.div`
    background: linear-gradient(to right, #d4fcff, #d4fcff, #d4fcff, #d4fcff);
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Dados = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    h2{
        margin: 0;
        margin-bottom: 10px;
    }
    
    p{
        margin: 0;
        font-weight: 600;
        span{
            font-weight: 100;
            text-decoration: underline;
        }
    }
`;