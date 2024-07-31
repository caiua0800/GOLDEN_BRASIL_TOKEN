import styled, { keyframes } from 'styled-components';

// const fadeIn = keyframes`
//     from {
//         opacity: 0;
//         transform: translateY(-20px);
//     }
//     to {
//         opacity: 1;
//         transform: translateY(0);
//     }
// `;

// const fadeOut = keyframes`
//     from {
//         opacity: 1;
//         transform: translateY(0);
//     }
//     to {
//         opacity: 0;
//         transform: translateY(-20px);
//     }
// `;

export const PopUpContainer = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 98888;
  
`;

export const PopUpContent = styled.div`
    background: linear-gradient(to bottom, #b5c806, #3fa34d) ;
    color: #fff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin-left: 16px;
    transition: color 0.3s;
    
    &:hover {
        color: #f00;
    }
`;
