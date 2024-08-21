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

  @media (max-width: 1000px) {
    margin-bottom: 40px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;

  @media (max-width: 1000px) {
    font-size: 20px;
    font-weight: 500;
  }
`;

const Content = styled.div`
  line-height: 1.6;
  text-align: justify;
`;

const Signature = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1000px) {
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

  @media (max-width: 1000px) {
    width: 100%;
  }

  & > div:nth-child(2) {
    border-bottom: 1px solid black;
    margin-top: 20px;
    margin-bottom: 5px;
    width: 100%;
    height: 1px;
  }

  .borderLine {
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
    valorPorContrato = 0,
  } = ContratoData || {};

  return (
    <PDFContainer>
      <Header>
        <Title>Contrato de Compra e Venda de Token</Title>
      </Header>
      <Content>
        <p>Pelo presente instrumento particular, as PARTES:</p>
        <p>
          I. HOLDING GOLDEN BRASIL, sociedade constituída sob as leis da República Federativa do Brasil, registrada sob o número 42.007.698/0001-17, com sede em São Paulo, doravante denominada "GOLDEN TOKEN BRASIL" ou "VENDEDORA", e de outro lado;
        </p>
        <p>
          II. Eu, <strong>{userData.NAME}</strong>, inscrito(a) no CPF sob o número <strong>{userData.CPF}</strong>, doravante denominado(a) como <strong>USUÁRIO</strong>, interessado(a) em firmar o presente CONTRATO, o qual preencheu devidamente o cadastro na plataforma da GOLDEN TOKEN BRASIL e encaminhou os seus respectivos documentos.
        </p>
        <p>
          Considerando que a GOLDEN TOKEN BRASIL, nos termos da legislação em vigor, dispõe de uma plataforma especializada na compra e venda de ativos digitais;
        </p>
        <p>
          As PARTES celebram o presente “Contrato de Compra e Venda de Criptoativos com Cláusula de Recompra” (“CONTRATO”), que se regerá pelas seguintes cláusulas e condições:
        </p>

        <h2>1. OBJETO DO CONTRATO E CARACTERÍSTICAS DOS SERVIÇOS</h2>
        <p>
          1.1 O presente CONTRATO tem por objeto a compra e venda de lote de TOKENS, disponibilizados pela GOLDEN TOKEN BRASIL, na plataforma digital encontrada no endereço eletrônico oficial da empresa.
        </p>

        <p>
          O presente contrato terá uma duração de <strong>{meses} meses</strong> e <strong>{dias} dias</strong>, durante os quais o <strong>USUÁRIO</strong> terá direito a um lucro diário estimado em <strong>U${formatNumber(lucroDiario)}</strong>, totalizando um lucro final de <strong>U${formatNumber(lucroTotal)}</strong>.
        </p>
        <p>
          A porcentagem total de lucro ao final do contrato será de <strong>{porcentagemLucro}%</strong>, conforme estipulado nas cláusulas do contrato firmado entre as partes.
        </p>

        <h3>PROPOSTA COMERCIAL – ANEXO I</h3>
        <p><strong>Exemplo 01 Token de USD $ 74,91</strong></p>
        <table>
          <thead>
            <tr>
              <th>Ano</th>
              <th>Valor a ser pago se o USUÁRIO optar por 1 Saque Anual</th>
              <th>Valor a ser pago se o USUÁRIO optar por mais Saques Anuais</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1º Ano</td>
              <td>37,45</td>
              <td>35,95</td>
            </tr>
            <tr>
              <td>2º Ano</td>
              <td>37,45</td>
              <td>35,95</td>
            </tr>
            <tr>
              <td>3º Ano</td>
              <td>37,45</td>
              <td>35,95</td>
            </tr>
          </tbody>
        </table>
        <p><strong>Total Final a ser pago pela Golden Token Brasil:</strong> U$ {formatNumber((porcentagemLucro/100)*(parseFloat(qttContratos)*parseFloat(valorPorContrato)))}</p>

        <p>Cada unidade de GOLDEN TOKEN BRASIL corresponde, alternativamente, a seguinte fração de minérios:</p>
        <p>
          01 GOLDEN TOKEN BRASIL equivale = 10kg Cobre Brutos; ou<br />
          01 Golden Token equivale = 5 a 10 pontos de Diamante Brutos; ou<br />
          01 GOLDEN TOKEN BRASIL equivale = 2 metros de Granito Branco Bruto, ou<br />
          Outros minérios conforme disponibilidade da extração ou estoque.
        </p>

        <p>
          As solicitações de saques são feitas no aniversário de 3 meses da primeira valorização de cada compra, nessa data se abrirá uma janela de solicitação de saque por 48 horas onde o USUÁRIO definirá se efetua a solicitação saque ou não. Para concluir a solicitação da compra você deve ter acumulado 25 dólares ou mais. Os pagamentos das solicitações serão efetuados no dia 01 de cada mês, caso não sejam dias úteis, será efetuado nos próximos dias úteis subsequentes.
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