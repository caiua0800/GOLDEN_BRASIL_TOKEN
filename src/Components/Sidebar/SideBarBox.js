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
                <img src={assets.sidebarMenu} alt='menu' />
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