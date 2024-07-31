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
    boox-shadow: 2px 3px 3px rgba(0,0,0,0.4);
    transition: width 5s ease;
`;

const BarContainer = styled.div`
    position: relative;
    width: 100%;
    height: 30px; // Ajuste a altura da barra
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
    // position: absolute;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%, -50%);
    margin-left: 20px;
    font-size: 14px; // Ajuste o tamanho da fonte conforme necessário
    font-weight: bold;
    color: black;
    z-index: 1; // Garante que o texto fique sobre a barra
`;

export default HorizontalProgressBar;
