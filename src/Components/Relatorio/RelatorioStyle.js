import styled from "styled-components";


export const RelatorioContainer = styled.div`
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
    align-items: center;
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
    width: 100%;
`;

export const TitleInitial = styled.h1`
    margin: 0;
    color: #000000
    text-align: start;

    @media(max-width: 1000px){
        text-align: center;
    }
`;

export const RelatorioContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 250px;
    gap: 20px;
`;

export const Filters = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap:

`;

export const RelatorioInputBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span{
        font-size: 22px;
        text-align: center;
        font-weight: 500;
    }

    input{
        width: 100%;
        height: 40px;
        background: linear-gradient(-70deg, #2e3033, #000000, #2e3033, #000000, #2e3033);
        color: gold;
        padding-left: 20px;
        box-sizing: border-box;
    }
`;

export const ButtonGenerate = styled.button`
    width: 280px;
    height: 40px;
    border: 0;
    box-shadow: 3px 3px 4px rgba(0,0,0,0.4);
    cursor: pointer;
    transition: .3s;

    &:hover{
        transform: scale(0.97);
        box-shadow: 6px 6px 4px rgba(0,0,0,0.6);
    }
`;

export const PDFModel = styled.div`
    width: 210mm; // Largura de uma página A4
    min-height: 297mm; // Altura mínima de uma página A4
    background-color: white;
    border-radius: 3px;
    box-shadow: 3px 3px 2px rgba(0,0,0,0.4);
    padding: 10mm;
    box-sizing: border-box;
    margin: 0 auto; // Centraliza o conteúdo
    overflow: visible; // Permite que o conteúdo exceda o tamanho da div
    display: none;
    @media print {
        box-shadow: none;
    }
`;


export const PdfTitle = styled.h2`
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
`;

export const PdfSubTitle = styled.h2`
    margin: 0;
    font-size: 8px;
    font-weight: 500;
    text-align: center;
    margin-top: 40px;
    text-align: start;
    padding-left: 10px;
    width: 100%;
    border-bottom: 1px solid black;
    box-sizing: border-box;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    box-sizing: border-box;

    th, td {
        // padding: 10px;
        box-sizing: border-box;
        text-align: center;
        font-size: 8px;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #f2f2f2;
        font-size: 8px;
        text-align: center;
    }

    tr:hover {
        background-color: #f5f5f5;
        font-size: 8px;
        text-align: center;ç

    }
`;

export const TotalSum = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 20px;
    flex-direction: column;

    p{
        width: 100%;
        margin: 0;
        font-size: 10px;
        font-weight: 500;
        text-align: center;
    }

    span{
        width: 100%;
        margin: 0;
        text-align: center;
        font-size: 8px;
        font-weight: 500;
    }
`;

export const HoldingGoldenGate = styled.div`
    width: 100%;
    text-align: start;
    margin-top: 60px;
    font-size: 6px;
    font-weight: 600;
`;

export const DownloadPDF = styled.button`
    width: 280px;
    height: 40px;
    border: 0;
    box-shadow: 3px 3px 4px rgba(0,0,0,0.4);
    cursor: pointer;
    transition: .3s;

    &:hover{
        transform: scale(0.97);
        box-shadow: 6px 6px 4px rgba(0,0,0,0.6);
    }
`;

export const Manutencao = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    font-size: 38px;
    font-weight: 800;
    color: black;
    position: fixed;
    top: 0;
    left: 0;
`;

export const RelatorioPDF = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // height: 80vh;
    background: white;
    box-sizing: border-box;
    padding: 40px 40px;
    border: 1px solid rgba(0,0,0,0.4);
`;

export const Titulo = styled.div`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    font-size: 32px;
    color: rgba(0,0,0,0.8);
    font-weight: 800;
    text-align: center;
`;

export const SessaoTitulo = styled.div`
    width: 100%;
    margin-top: 40px;
    box-sizing: border-box;
    padding-left: 40px;
    font-size: 26px;
    color: rgba(0,0,0,0.8);
    font-weight: 600;
    text-align: start;
`

export const ContratosDoRelatorio = styled.div`
    margin-top: 20px;
    padding: 40px;
    width: 100%;
    box-sizing: border-box;
    // height: 50vh;
    display: flex;
    overflow: auto;
    flex-direction: column;
    gap: 5px;
`;

export const ContratoItem = styled.div`
    background: rgba(30, 30, 30, 0.2);
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 2fr 2fr;

    .item1{
        width: 100%;
        height: 100%;
        display: flex;
        padding: 0 20px;
        align-items: center;
        box-sizing: border-box;
        color: white;
        font-weight: 600;
        background: linear-gradient(-45deg, rgba(20, 20, 20, 1), rgba(60, 60, 60, 1), rgba(20, 20, 20, 1));
    }

    .item2{
        padding: 0 20px;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: end;
        box-sizing: border-box;
        color: white;
        font-weight: 600;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.8);
        background: linear-gradient(-45deg, #c9a227, #fad643, #c9a227);
    }
`;

export const BotaoGerarImprimirPDF = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    button{
        width: 80%;
        height: 40px;
        cursor: pointer;
    }
`;