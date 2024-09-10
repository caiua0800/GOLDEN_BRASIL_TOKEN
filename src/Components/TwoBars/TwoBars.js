// Components/TwoBars.js
import React from 'react';
import HorizontalProgressBar from './HorizontalProgressBar';
import styled from 'styled-components';

const TwoBars = ({ totalSpent, totalValue }) => {
    const spentPercentage = (totalValue && totalSpent) ? (totalSpent / totalValue) * 100 : 0;
    const profitPercentage = (totalValue && totalSpent) ? ((totalValue - totalSpent) / totalValue) * 100 : 0;

    const profitColor = profitPercentage >= 0 ? "#28a745" : "#dc3545"; // Green for profit, red for loss
    const profitHoverColor = profitPercentage >= 0 ? "#71dd8a" : "#ff7f7f"; // Lighter green or red for hover

    return (
        <ParentContainer>
            <h6>COMPRA</h6>
            <HorizontalProgressBar
                percentage={spentPercentage}
                color="#007bff"
                hoverColor="#71c2ff"
            />
            <h6>LUCRO</h6>
            <HorizontalProgressBar
                percentage={profitPercentage}
                color={profitColor}
                hoverColor={profitHoverColor}
            />
        </ParentContainer>
    );
};

const ParentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin-top: 20px;
    
    h6{
        margin: 0;
        margin-bottom: -5px;
        font-size: 12px;
        color: rgba(0,0,0,0.5);
    }

    @media (max-width: 800px) {
        gap: 10px;
    }
`;

export default TwoBars;
