import styled from "styled-components";

export const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.6);
  z-index: 9999;
  box-sizing: border-box;
`;

export const ModalBox = styled.div`
  width: 80%;
  box-sizing: border-box;
  // background-color: rgba(255,255, 255, 1);
  background: linear-gradient(-70deg, #B17D2A, #B17D2A, #B17D2A, #E6AA3A, #B17D2A, #B17D2A, #B17D2A);
  position: relative;
  box-shadow: 3px 3px 2px rgba(0,0,0,0.7);
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

export const FecharModalBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  span {
    cursor: pointer;
    color: rgba(0,0,0,0.7);
    transition: .3s;
    &:hover {
      color: rgba(0,0,0,0.9);
      transform: scale(0.95);
    }
  }
`;

export const ModalPDFContainer = styled.div`
  width: 100%;
  box-sizing: border-box;

`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;

  label {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
  }

  input {
    margin-right: 8px;
    cursor: pointer;
  }
`;

export const ConfirmacaoDeCadastro = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    flex-direction: column;

    span{
      color: white;
      font-weight: 600;
    }

    button{
        width: 100%;
        margin-top: 20px;
        height: 40px;
        cursor: pointer;
        transition: .3s;

        &:hover{
            transform: scale(0.99);
        }
    }
`;

export const LoginBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;

    input{
        width: 100%;
        height: 40px;
        border: 0;
        box-shadow: 3px 3px 1px rgba(0,0,0,0.3);
        box-sizing: border-box;
        padding-left: 20px;
        color: rgba(0,0,0,0.7);
        font-size: 18px;
    }
`;

export const ModalTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  h1{
    margin: 0;
    font-weight: 500;
    color: #FFFFFF;
    font-size: 22px;
  }
`;

export const ValorASerSacado = styled.div`

  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;

  input{
    width: 300px;
    height: 40px;
    border: 0;
    box-shadow: 3px 3px 2px rgba(0,0,0,0.3);
    box-sizing: border-box;
    text-align: center;
    color: white;
    font-weight: 800;
    font-size: 20px;
    background: linear-gradient(-70deg, #000000, #000000, #000000, #262323, #000000, #000000, #000000);
  }

  h2,h3, h4{
    margin: 0;
    font-weight: 600;
    font-size: 18px;

  }

  h2{
    margin-top: 20px;
    color: #FFFFFF;
  }

  h3{
    text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
  }

  h4{
    color: rgba(0,0,0,0.6);
    text-shadow: none;
  }
`;

// export const nome = styled.div``;

// export const nome = styled.div``;

// export const nome = styled.div``;