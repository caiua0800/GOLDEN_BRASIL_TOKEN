
import styled from "styled-components";

export const Container = styled.div`
  background-color: #202020;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  .Arraste{
    width: 100%;
    position: absolute;
    bottom: 40px;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    font-size: 18px; 
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
      width: 40px;
      opacity: 0.6;
    }
    
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? "block" : "none")};
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
`;

export const LoginBox = styled.div`
  position: relative;
  background-color: #333333;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
`;

export const Logo = styled.img`
  width: 100px;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  color: #ffffff;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  background-color: #444444;
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 10px;

  &::placeholder {
    color: #bbbbbb;
  }
`;

export const InputPass = styled.div`
  background-color: #444444;
  display: flex;
  height: 40px;
  box-sizing: border-box;
  align-items: center;
  position:relative;

  button{
    height: 20px;
    border: 0;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
    position: absolute;
    right: 10px;

    img{
      width: 20px;
    }
  }

  input{
    background-color: #444444;
    border: none;
    border-radius: 5px;
    padding: 10px;
    color: #ffffff;
    font-size: 16px;
    width: 100%;

    &::placeholder {
      color: #bbbbbb;
    }
  }
`;

export const SubmitButton = styled.button`
  background-color: #6e6eff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4b4bff;
  }
`;


export const SignUpText = styled.span`
  text-decoration: none;
`;

export const ErrorPopup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #202020;
  padding: 20px;
  display: flex;
  width: 500px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 9999;

  @media (max-width: 800px){
    width: 300px;
  }
`;

export const ErrorMessage = styled.p`
  color: white;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const ErrorBar = styled.div`
  width: 100%;
  height: 5px;
  background-color: #2382EF;
  animation: errorBarAnimation 2s linear forwards;
  border-radius: 5px;
  margin-top: 10px;

  @keyframes errorBarAnimation {
    0% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }
`;

export const singUpLink = styled.span`
  margin-top: 3px;
  color: rgba(255, 255, 25, 0.6);
  font-size: 12px;
  width: 100%;
  text-align: center;

  a{
    color: rgba(100,100,255, 1);
    transition: .3s;
    cursor: pointer;
    &:hover{
      color: aliceblue;
    }
  }
`;

export const forgotPassLinky = styled.a`
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  width: 100%;
  text-align: end;
  transition: .3s;
  cursor: pointer;
  &:hover{
    color: white;
  }
`;







// Simulate

export const SimulacaoContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(75deg, #0d0a00, #9c8314, #9c8314, #0d0a00);
  border-top: 4px solid white;
  box-shadow: -0px -0px 40px white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 40px;
  box-sizing: border-box;

  h1{
    max-width: 40%;
    text-align: center;
    margin: 0;
    margin-top: 40px;
    font-size: 42px;
    color: white;
    text-shadow: -2px 4px 30px white;
  }

  @media (max-width: 1200px){
    padding: 10px 20px;

    h1{
      min-width: 100%;
      font-size: 28px;
    }
  }
`;


export const SimulationContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 100px;

  @media (max-width: 1200px){
    margin-top: 50px;
  }
`;

export const InputMoney = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  p{
    margin: 0;
    color: gold;
    text-shadow: 0 0 5px black,
    1px 1px 5px white;
    font-size: 28px;
    font-weight: 800;
    text-align: center;
  }

  input{
    width: 300px;
    height: 35px;
    box-sizing: border-box;
    border: 4px solid transparent;
    box-shadow: 4px 4px 2px rgba(0,0,0,0.4);
    font-size: 18px;
    text-align: center;
    padding: 0;
    font-weight: 800;
    color: rgba(0,0,0,0.8);
  }

  @media (max-width: 1200px){
    p{
      font-size: 22px;
    }

    input{
      width: 250px;
    }
  }
`;

export const Results = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;

  h3{
    margin: 0;
    font-size: 32px;
    color: gold;
    text-shadow: 0 0 5px black,
    1px 1px 5px white;
  }

  ul{
    li{
      margin: 15px;
      font-size: 18px;
      color: white;
      font-weight: 500;
      text-shadow: 0 0 5px white;
    }
  }

  @media (max-width: 1200px){
    h3{
      font-size: 24px;
      width: 100%;
      text-align: center;
    }
  }
`;