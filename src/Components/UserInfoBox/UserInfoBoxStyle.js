// src/components/UserInfoBox/UserInfoBoxStyles.js
import styled from 'styled-components';

export const Box = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Info = styled.div`
  p {
    margin: 0;
    font-size: 14px;
    color: #333;
  }

  button {
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
  }
`;
