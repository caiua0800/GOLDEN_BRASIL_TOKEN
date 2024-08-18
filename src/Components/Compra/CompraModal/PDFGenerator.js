import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../../context/AuthContext';
import { formatNumber } from '../../../assets/utils';

const PDFContainer = styled.div`
  width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 1000px) {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 30px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 1000px){
    margin-bottom: 40px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;

  @media (max-width: 1000px){
    font-size: 20px;
    font-weight: 500;
  }
`;

const Content = styled.div`
  line-height: 1.6;
`;

const Signature = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1000px){
    display: flex;
    justify-content: center;
    gap: 5px;
    box-sizing: border-box;
    flex-wrap: wrap;
  }
`;

const SignatureBlock = styled.div`
  text-align: center;
  width: 45%;

  @media (max-width: 1000px){
    width: 100%;
  }

  & > div:nth-child(2) {
    border-bottom: 1px solid black;
    margin-top: 20px;
    margin-bottom: 5px;
    width: 100%;
    height: 1px;
  }

  .borderLine{
    margin-top: 20px;
  }
`;

const PDFGenerator = ({ ContratoData, assinatura }) => {
  const { userData } = useContext(AuthContext);
  const {
    meses = 0,
    dias = 0,
    lucroDiario = 0,
    lucroTotal = 0,
    porcentagemLucro = 0,
    qttContratos = 0,
    valorPorContrato = 0
  } = ContratoData || {};

  return (
    <PDFContainer>
      <Header>
        <Title>Contrato de Compra e Venda</Title>
      </Header>
      <Content>
        <p>
          Eu, <strong>{userData.NAME}</strong>, inscrito(a) no CPF sob o número <strong>{userData.CPF}</strong>, doravante denominado(a) como <strong>Comprador(a)</strong>,
          declaro que adquiri um total de <strong>{qttContratos}</strong> contratos, cada um no valor de <strong>U${formatNumber(valorPorContrato)}</strong>.
        </p>
        <p>
          O presente contrato terá uma duração de <strong>{meses} meses</strong> e <strong>{dias} dias</strong>, durante os quais o <strong>Comprador(a)</strong>
          terá direito a um lucro diário estimado em <strong>U${formatNumber(lucroDiario)}</strong>, totalizando um lucro final de <strong>U${formatNumber(lucroTotal)}</strong>.
        </p>
        <p>
          A porcentagem total de lucro ao final do contrato será de <strong>{porcentagemLucro}%</strong>, conforme estipulado nas cláusulas
          do contrato firmado entre as partes.
        </p>
        <p>
          Este documento serve como comprovante das condições acordadas e deve ser assinado por ambas as partes para que o contrato
          tenha validade legal.
        </p>
      </Content>
      <Signature>
        <SignatureBlock>
          <div>{assinatura}</div>
          <div className='borderLine'></div>
          <div>Assinatura do Comprador(a)</div>
        </SignatureBlock>
        <SignatureBlock>
          <div></div>
          <div className='borderLine'></div>
          <div>Assinatura do Vendedor</div>
        </SignatureBlock>
      </Signature>
    </PDFContainer>
  );
};

export default PDFGenerator;
