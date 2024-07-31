import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../../context/UserContext';
import { formatNumber } from '../../../assets/utils';

const PDFContainer = styled.div`
  width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Times New Roman', Times, serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const SubTitle = styled.h2`
  font-size: 18px;
  margin: 5px 0;
`;

const Content = styled.div`
  line-height: 1.5;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Signature = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
`;

const SignatureBlock = styled.div`
  text-align: center;
`;

const PDFGenerator = ({ ContratoData, assinatura }) => {
  const { userData } = useContext(UserContext);
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
        <SubTitle>Identificação do Contrato</SubTitle>
      </Header>
      <Content>
        <Section>
          <Label>Nome do Cliente:</Label> {userData.NAME}
        </Section>
        <Section>
          <Label>CPF do Cliente:</Label> {userData.CPF}
        </Section>
        <Section>
          <Label>Quantidade de Contratos:</Label> {qttContratos}
        </Section>
        <Section>
          <Label>Valor por Contrato:</Label> U${formatNumber(valorPorContrato)}
        </Section>
        <Section>
          <Label>Período do Contrato:</Label> {meses} meses e {dias} dias
        </Section>
        <Section>
          <Label>Lucro Diário:</Label> U${formatNumber(lucroDiario)}
        </Section>
        <Section>
          <Label>Lucro Total:</Label> U${formatNumber(lucroTotal)}
        </Section>
        <Section>
          <Label>Porcentagem de Lucro Final:</Label> {porcentagemLucro}%
        </Section>
      </Content>
      <Signature>
        <SignatureBlock>
          <div>{assinatura}</div>
          <div>____________________________</div>
          <div>Assinatura do Comprador</div>
        </SignatureBlock>
        <SignatureBlock>
          <div>____________________________</div>
          <div>Assinatura do Vendedor</div>
        </SignatureBlock>
      </Signature>
    </PDFContainer>
  );
};

export default PDFGenerator;
