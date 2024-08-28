// Components/HorizontalProgressBar.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const HorizontalProgressBar = ({ percentage, color, hoverColor }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setProgress(percentage);
        }, 500); // Delay before starting the animation

        return () => clearTimeout(timeout);
    }, [percentage]);

    return (
        <BarContainer hoverColor={hoverColor}>
            <BarBackground />
            <BarFill style={{ width: `${progress}%`, backgroundColor: color }} />
            <BarText>{`${percentage.toFixed(2)}%`}</BarText>
        </BarContainer>
    );
};

const BarFill = styled.div`
    height: 100%;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 2px 3px 3px rgba(0,0,0,0.4);
    transition: width 5s ease;
`;

const BarContainer = styled.div`
    position: relative;
    width: 100%;
    height: 30px; 
    display: flex;
    align-items: center;
    border-radius: 15px;
    background-color: #e0e0e0;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }

    &:hover ${BarFill} {
        transition: background-color 0.3s ease;
        background-color: ${(props) => props.hoverColor};
    }

    @media (max-width: 1000px){
        height: 20px; 
        
    }
`;

const BarBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #e0e0e0;
    border-radius: 15px;
`;

const BarText = styled.p`

    margin-left: 20px;
    font-size: 14px; // Ajuste o tamanho da fonte conforme necessário
    font-weight: 500;
    color: black;
    z-index: 1; // Garante que o texto fique sobre a barra
    
    @media (max-width: 1000px){
        font-size: 12px;
    }
`;

export default HorizontalProgressBar;
