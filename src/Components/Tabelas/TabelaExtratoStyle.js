import styled from "styled-components";

export const TabelaContainer = styled.div`
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: linear-gradient(-60deg, #3d4763, #3288be, #31d0e3);
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
            color: #fe5f55; /* vermelho escuro para saque */
        }

        &.indicacao {
            color: #6acc1a; /* verde escuro para indicação */
        }
    }
`;
