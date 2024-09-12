import styled from 'styled-components';

// Defina cores diferentes para os tipos de mensagem
const getColor = (type) => {
    switch(type) {
        case 'success':
            return 'linear-gradient(to bottom, #b5c806, #3fa34d)'; // Verde para sucesso
        case 'error':
            return 'linear-gradient(to bottom, #ff4d4d, #d32f2f)'; // Vermelho para erro
        default:
            return 'linear-gradient(to bottom, #b5c806, #3fa34d)'; // Padrão verde
    }
};

export const PopUpContainer = styled.div`
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 999999999999;
`;

export const PopUpContent = styled.div`
    background: ${(props) => getColor(props.type)};
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
