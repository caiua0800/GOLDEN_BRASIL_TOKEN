// src/components/MessageBox.js
import React from 'react';
import styled from 'styled-components';

const MessageBoxContainer = styled.div`
    position: fixed;
    top: 10%;
    right: 10%;
    background-color: #fff;
    border: 1px solid ${props => props.type === 'error' ? '#e74c3c' : '#2ecc71'};
    color: ${props => props.type === 'error' ? '#e74c3c' : '#2ecc71'};
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-width: 300px;
`;

const MessageBox = ({ message, type }) => {
    return (
        <MessageBoxContainer type={type}>
            {message}
        </MessageBoxContainer>
    );
};

export default MessageBox;