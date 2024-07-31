import styled from "styled-components";

export const Container = styled.div`
  background-color: #202020;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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

// export const SignUpLink = styled(Link)`
//   color: #ffffff;
//   font-size: 14px;
//   text-decoration: underline;
//   cursor: pointer;
//   margin-top: 20px;
//   display: block;
// `;

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