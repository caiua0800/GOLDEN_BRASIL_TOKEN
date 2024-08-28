import styled from "styled-components";

export const NewsContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background-image: url('textura.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;
    padding: 50px 30px 200px 40px;
    display: flex;
    flex-direction: column;
    position: relative;

    @media (max-width: 800px){
        flex-direction: column;
        justify-content: center;
        padding: 20px 10px 100px 10px;
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

export const NewsBoxes = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`;

export const NewsCard = styled.div`
    width: 80%;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    overflow: hidden;
    // background: #ffffff; 
    background: linear-gradient(-60deg, #000000, #000000, #000022, #000000 , #000000);

    @media (max-width: 800px){
        width: 90%;
    }
`;

export const NewsImageBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

export const NewsImage = styled.img`
    width: 60%;
    border-radius: 12px;
    height: auto;
    object-fit: cover;

    @media (max-width: 800px){
        width: 90%;
    }
`;

export const NewsTitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: #FFFFFF;  // Cor do texto escura
    margin: 20px 10px 10px 10px;
    text-align: center;

    @media (max-width: 800px){
        text-align: justified;
        font-size: 20px;
        width: 90%;
    }
`;

export const NewsBody = styled.div`
    font-size: 18px;
    color: #FFFFFF;  
    margin: 10px;
    padding: 10px 20px;
    box-sizing: border-box;
    text-align: justify;

    @media (max-width: 800px){
        font-size: 16px;
    }
`;

export const Text = styled.p`
    font-size: 18px;
    color: #FFFFFF;  // Cor do texto mais clara

    @media (max-width: 800px){
        font-size: 16px;
    }
`;

export const ToggleExpandButton = styled.button`
    background-color: transparent;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-size: 16px;
    padding: 0;
    margin-top: 5px;

    &:hover {
        text-decoration: underline;
    }
`;

export const NewsData = styled.div`
    width: 95%;
    padding-bottom: 10px;
    margin-right: 20px;
    display: flex;
    justify-content: end;
    font-weight: 600;
    color: #999999;  
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

export const NoticiasTitle = styled.div`
    font-size: 38px;
    text-shadow: 3px 4px 1px rgba(0,0,0,0.2);
    font-weight: 800;
`;
