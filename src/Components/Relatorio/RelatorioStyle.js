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
`;

export const RelatorioInputBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span{
        font-size: 22px;
        font-weight: 500;
    }

    input{
        width: 300px;
        height: 30px;
        background: linear-gradient(-70deg, #2e3033, #000000, #2e3033, #000000, #2e3033);
        color: gold;
        padding-left: 20px;
        box-sizing: border-box;
    }
`;

export const ButtonGenerate = styled.button`
    width: 620px;
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
    width: 280px;
    height: 400px;
    background-color: white;
    border-radius: 3px;
    // border: 1px solid black;
    box-shadow: 3px 3px 2px rgba(0,0,0,0.4);
    padding: 10px;
    box-sizing: border-box;
    transition: .5s;

    &:hover{
        transform: scale(1.5);
        box-shadow: 7px 7px 4px rgba(0,0,0,0.4);
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

// export const nome = styled.div``;
