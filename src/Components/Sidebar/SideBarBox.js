import { Sidebar } from "./Sidebar";
import React, { useState } from "react";
import assets from "../../assets/assets";
import styled from "styled-components";


export default function SideBarBox({ children }) {
    const [sideBarState, setSideBarState] = useState(false);
    const handleSidebar = () => {
        setSideBarState(!sideBarState);
    }

    return (
        <>
            <Sidebar isOpen={sideBarState}/>
            <BtnSidebar onClick={handleSidebar}>
                <img src='logo-golden.png' alt='menu' />
                {/* <img src={assets.sidebarMenu} alt='menu' /> */}
            </BtnSidebar>

            {children}
        </>
    )   

}


const BtnSidebar = styled.button`

    position: fixed;
    top: 50px;
    right: 50px;
    z-index: 9999;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, black, rgba(0,0,0,0.8), rgba(0,0,0,0.7));
    border: 2px solid black;
    border-radius: 3px;
    cursor: pointer;
    transition: .3s;
    // box-shadow: 3px 3px 3px rgba(0,0,0,0.6);
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 1));

    &:hover{
        transform: scale(1.1);
    }

    img{
        z-index: 9999;
        width: 100%;
        filter: drop-shadow(0 10px 10px rgba(255, 255, 0, 0.2));
        height: 100%;
    }

    @media (max-width: 1000px){
        top: 20px;
        right: 20px;
    }
`;