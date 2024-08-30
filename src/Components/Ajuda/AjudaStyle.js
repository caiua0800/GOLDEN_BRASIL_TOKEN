import styled from "styled-components";


export const AjudaContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    // background: linear-gradient(to right, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF);
    background-image: url('textura.jpg');
    background-size: cover;
    background-repeat: no-repeat;
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

export const AjudaTitle = styled.h1`
    margin: 0;
    color: #000000;
    text-shadow: 3px 3px 2px rgba(0,0,0,0.2);
    width: 100%;
    text-align: start;

    @media (max-width: 1000px){
        text-align: center;
    }
`;

export const AjudaContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin-top: 40px;
    z-index: 2;
`;

export const AjudaContentTitle = styled.h2`
    margin: 0;
    width: 100%;
    font-size: 2rem;
    background: linear-gradient(to right, #B17D2A, #E6AA3A);
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent; 
    background-clip: text; 
    color: transparent; 
    text-align: center;

    @media (max-width: 1000px){
        text-shadow: 2px 2px 8px rgba(0,0,0,0.2);
    }
`;


export const SelectionHelp = styled.select`
    margin-top: 20px;
    width: 350px;
    height: 40px;
    border-radius: 8px;
    border: 4px solid #B17D2A;
    background: linear-gradient(-70deg, #2e3033, #000000, #2e3033, #000000, #2e3033);
    color: #E6AA3A;
    box-sizing: border-box;
    padding-left: 10px;
    font-weight: 600;
`;

export const OptionHelp = styled.option`
    color: white;
`;

export const ResponseBoxContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    flex-direction: column;
`;

export const ResponseBoxContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    p{
        color: #000000;
        margin: 0;
    }

    a{
        color: blue;
        text-decoration: underline;
    }

    span{
        margin: 0;
        color: #000000;
        font-weight: 500;
    }

    textarea{
        width: 350px;
        height: 100px;
        padding: 5px;
        box-sizing: border-box;
        background: linear-gradient(-70deg, #2e3033, #000000, #2e3033, #000000, #2e3033);
        color: #E6AA3A;
        font-size: 15px;
    }

    button{
        height: 40px;
        font-size: 16px;
        color: #000000;
        font-weight: 500;
        background: linear-gradient(to right, rgba(245, 50, 0, 1), rgba(245, 100, 0, 1));
        border: 0;
        box-shadow: 3px 3px 2px rgba(0,0,0,0.3);
        transition: .3s;
        cursor: pointer;

        &:hover{
            transform: scale(0.97);
            box-shadow: 6px 6px 2px rgba(0,0,0,0.3);
        }
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


export const WhatsAppIcon = styled.img`
    width: 80px;
    position: fixed;
    bottom: 50px;
    right: 40px;
    transition: .3s;
    cursor: pointer;
    
    &:hover{
        transform: scale(1.05);
    }
`;

// export const styleName = styled.div``;

// export const styleName = styled.div``;

// export const styleName = styled.div``;


