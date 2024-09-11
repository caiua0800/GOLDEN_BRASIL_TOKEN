import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    box-sizing: border-box;
    margin: 10px;
    background: linear-gradient(to right, #d6d6d6, #ffff);
    height: 98vh;
    top: 0;
    width: 400px;
    border-radius: 0 10px 0 0;
    z-index: 9999;
    transform: translateX(-200%);
    transition: transform 0.4s ease-in-out;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 3px solid black;

    &.open {
        transform: translateX(0);
    }

    @media (max-width: 1000px){
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        margin: 0;
        border-radius: 0;
    }

`;

export const LogoBox = styled.div`
    width: 100%;
    height: 15%;
    background: linear-gradient(to right, , #ffff);
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 20px 10px;
    flex-direction: column;

    img{
        width: 130px;
    }

    span{
        font-weight: 800;
        color: #ffc300;
        text-shadow: 2px 1px 3px rgba(0,0,0,0.4);
        font-size: 32px;
        text-align: center;
    }

    @media (max-width: 1000px){
        img{
            width: 100px;
        }

        span{
           font-size: 22px; 
        }
    }
`;


export const Mapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 25% 0 0 0;
    box-sizing: border-box;
    padding: 10px;
    height: 60%;
    background: linear-gradient(to right, #d6d6d6, #ffff);

    a{
        text-decoration: none;
    }

    @media (max-width: 1000px){
        padding: 5px;
        height: 50%;
        gap: 5px;
    }
`;

export const NavItem = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    padding: 10px;
    color: rgba(0,0,0,0.6);
    background-color:rgba(0,0,0,0.2);
    transition: .3s;

    &.logout-link{
        background-color: rgba(244, 20, 30, 1);
        color: white;
    }

    &:hover{
        color: rgba(0,0,0,1);
        transform: scale(1.03);
    }   

    @media (max-width: 1000px){
        padding: 8px;
    }
`;

export const NavLink = styled.div`
    box-sizing: border-box;
    font-size: 22px;
    font-weight: 600;

    @media (max-width: 1000px){
        font-size: 18px;
    }
`;

export const Footer = styled.div`
    height: 15%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .3s;
    // padding-left: 30px;
    gap: 20px;
    box-sizing: border-box;
    cursor: pointer;

    span{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        color: transparent;
        box-shadow: 2px 2px 6px rgba(0,0,0,0.7);
        background-color: white;
        overflow: hidden;
        display: flex;

        align-items: center;
        justify-content: center;
        img{
            width: 150%;
            // height: 100%;
        }
    }

    p{
        margin: 0;
        font-size: 28px;
        font-weight: 800;
        color: rgba(0, 0, 0, 0.6);
    }

    &:hover{
        transform: scale(1.1);
    }
`;

