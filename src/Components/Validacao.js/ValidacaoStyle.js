import styled from "styled-components";

export const ValidacaoContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background-image: url('textura.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;
    padding: 50px 30px 50px 40px;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    gap: 20px;
    position: relative;

    @media (max-width: 800px){
        flex-direction: column;
        justify-content: center;
        padding: 20px 10px 50px 10px;
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


export const ValidacaoCenter = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ValidacaoHeader = styled.div`
    margin-bottom: 20px;
    color: rgba(0,0,0,0.7);

    h3{
        font-size: 24px;
        font-weight: bold;
        margin: 0;
    }

    div{
        padding-left: 20px;
        span{
            display: block;
            color: rgba(255,0,0,0.7);
            padding-top: 20px;
            font-weight: 600;
        }

        ul{
            margin-top: 10px;

            li{
                font-style: italic;
            }
        }
    }

    @media (max-width: 800px){
        h3{
            font-size: 24px;
            font-weight: bold;
            margin: 0;
            text-align: center;
        }

        div{
            padding-left: 20px;
            display: flex;
            flex-direction: column;
            align-items: start;
            margin-top: 20px;
            ul{
                margin-top: 10px;
            }
        }
    }
`;

export const ValidacaoUploadFiles = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    
    label {
        font-size: 18px;
        margin-bottom: 10px;
    }

    input {
        font-size: 16px;
    }

    @media (max-width: 800px){
        width: 100%;
        flex-direction: column;
        padding: 30px;
        box-sizing: border-box;
        overflow: hidden;
    }
`;

export const ValidacaoConfirmation = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;

    button{
        width: 50%;
        height: 40px;
        border: 0;
        border-radius: 8px;
        background-color: rgba(40, 220, 10, 0.8);
        font-weight: 600;
        color: rgba(0,0,0,0.6);
        transition: .3s;

        &:hover{
            color: rgba(0,0,0,1);
            box-shadow: 2px 3px 4px rgba(0,0,0,0.6);
        }
    }

    @media (max-width: 800px){
        margin-top: 0px;

        button{
            width: 100%;
        }
    }
`;

export const ValidacaoFooter = styled.div`
    margin-top: 50px;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: start;

    span{
        font-weight: 600;
        color: rgba(0,0,0,0.6);
        text-align: center;
    }
`;

export const UploadDocument = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 500px;
    height: 600px;
    position: relative;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 2px 2px 3px rgba(0,0,0,0.6);
    background-color: rgba(0,0,0,0.1);
    overflow: hidden;
    box-sizing: border-box;
    text-align: center;

    label {
        font-size: 24px;
        color: rgba(0,0,0,0.3);
    }

    input {
        cursor: pointer;
    }

    @media (max-width: 800px){
        width: 100%;
        height: 450px;
            
        label {
            font-size: 20px;
        }

        input {
            width: 100%;
        }
    }
`;

export const UploadFace = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 500px;
    height: 600px;
    position: relative;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 2px 2px 3px rgba(0,0,0,0.6);
    background-color: rgba(0,0,0,0.1);
    overflow: hidden;
    box-sizing: border-box;
    text-align: center;

    label {
        font-size: 24px;
        color: rgba(0,0,0,0.3);
    }

    input {
        cursor: pointer;
    }

    @media (max-width: 800px){
        width: 100%;
        height: 450px;
            
        label {
            font-size: 20px;
        }

        input {
            width: 100%;
        }
    }
`;

export const ImagePreview = styled.img`
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 20px;
`;

export const ValidacaoSuccess = styled.div`
    width: 100%;
    max-width: 600px;
    padding: 20px;
    border-radius: 8px;
    background-color: #d4edda;
    color: #155724;
    text-align: center;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    font-weight: bold;

    h3 {
        margin: 0;
        font-size: 24px;
    }

    p {
        font-size: 18px;
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