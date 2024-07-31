import styled from "styled-components";

export const ExtratoContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background: linear-gradient(to right, #d4fcff, #d4fcff, #d4fcff, #d4fcff);

    box-sizing: border-box;
    padding: 50px 30px 200px 30px;
    display: flex;
    flex-direction: column;
    position: relative;
    @media (max-width: 800px){
        flex-direction: column;
        justify-content: center;
        padding: 60px 10px 100px 10px;
    }
`;

export const LoadBox = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
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
    &:hover {
        transform: scale(1.1);
    }
    img {
        z-index: 9999;
        width: 100%;

    }
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
    span {
        font-size: 28px;
    }
    p {
        margin: 0;
    }
    &:hover {
        padding: 0px 0px 0px 10px;
        color: #ffd100;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
    }
    @media (max-width: 800px) {
        flex-direction: column;
        span {
            font-size: 16px;
        }
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    margin: 20px 0;
`;

export const FilterButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #0056b3;
    }
`;
