import styled from 'styled-components';

export const Tabela = styled.table`
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: linear-gradient(-60deg, #000000, #2b2d2e, #2b2d2e, #2b2d2e, #000000);
    // background: linear-gradient(-60deg, #3d4763, #3288be, #31d0e3);
    margin-top: 20px;
    box-shadow: 2px 3px 4px rgba(0,0,0,0.7);
`;

export const TabelaHead = styled.thead`
    // background-color: #1982C4;
`;

export const TabelaBody = styled.tbody`
    color: #a2d6f9;
    font-weight: 500;
`;

export const TabelaRow = styled.tr`
    &:nth-child(even) {
        background-color: rgba(0,0,0,0.4);
        color: white;
    }

    &:hover {
        background-color: rgba(0,0,0,0.2);
    }
`;

export const TabelaHeader = styled.th`
    padding: 12px 15px;
    text-align: left;
    color: white;
    font-weight: bold;
    border-bottom: 1px solid #ddd;


`;

export const TabelaData = styled.td`
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;

    span{
        text-decoration: underline;
        color: rgba(20,200,100,1);
        cursor: pointer;
        text-align: center;
    }
`;

export const Certificado = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 2px;
    button{
        width: 100%;
        height: 100%;
        cursor: pointer;
        height: 30px;
    }
`;

export const DownloadContratoButton = styled.button`
    font-weight: 500;
    
`;
