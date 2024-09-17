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
  width: max-content;
  box-sizing: border-box;
  background-color: rgba(255,255, 255, 1);
  position: relative;
  box-shadow: 3px 3px 2px rgba(0,0,0,0.7);
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  border-radius: 12px;
`;

export const FecharModalBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;

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
        border: 0;
        box-shadow: 4px 4px 2px rgba(0,0,0,0.4);

        &:hover{
            transform: scale(0.99);
            box-shadow: 8px 8px 4px rgba(0,0,0,0.4);
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
        background-color: rgba(255, 230, 240, 1);
    }
 
`;

export const ModalTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  h1{
    margin: 0;
    font-weight: 800;
    color: #000000;
    font-size: 28px;
    text-shadow: 6px 7px 1px rgba(0,0,0,0.1);
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
    color: #000000;
  }

  h3{
    text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
  }

  h4{
    color: rgba(0,0,0,0.6);
    text-shadow: none;
  }

  span{
    margin-top: 10px;
    font-weight: 600;
  }
`;

export const ContratosDisponiveis = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p{
    margin: 0;
    text-align: center;
    margin-top: 20px;
    text-decoration: underline;
    font-weight: 800;
  }

  ul{
    list-style: none;
    padding: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 5px;

    li{
      color: ${({ isSelected }) => (isSelected ? 'green' : 'black')};
      font-weight: 800;
      cursor: pointer;
      transition: .3s;
      padding: 0;
    
    }
  }
`;

export const Nenhum = styled.p`
  margin: 0;
  margin-top: 10px;
  color: red;
  font-weight: 800;
  text-align: center;
`;


export const Contratinho = styled.div`
  display: flex;
  // max-width: 300px;
  padding: 5px;
  gap: 10px;
  margin: 5px;
  align-items: center;
  transition: .3s;

  img{
    width: 40px;
  }

  div{
    text-align: start;

    span{
        margin: 0;
    }
  }


  &:hover{
    color: ${({ isSelected }) => (isSelected ? 'green' : 'orange')};
    transform: scale(0.97);
    text-shadow: 1px 1px 1px rgba(0,0,0,0.4);
    box-shadow: 0 0 6px rgba(0,0,0,0.4);
  }
`;

// export const nome = styled.div``;

// export const nome = styled.div``;

