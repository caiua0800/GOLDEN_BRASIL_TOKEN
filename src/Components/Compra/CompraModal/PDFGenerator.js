import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../../context/AuthContext';
import { formatCPF, formatNumber } from '../../../assets/utils';
import moment from 'moment-timezone';

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


  &.maisProLado{
    padding-left: 30px;
  }
`;

const Signature = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: end;

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
    margin-top: 0px;
    margin-bottom: 5px;
    width: 100%;
    height: 1px;
  }

  .borderLine {
    margin-top: 20px;
  }
`;

const AssinaturaGolden = styled.img`
  width: 300px;
`;

const PDFGenerator = ({ ContratoData, assinatura, lastId }) => {
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

  const dataAtual = moment.tz("America/Sao_Paulo").format('DD/MM/YYYY');

  function formatarData(dataString) {
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
  
    const [dia, mes, ano] = dataString.split('/');
  
    // Convertendo o mês para o nome em português
    const nomeMes = meses[parseInt(mes, 10) - 1];
  
    return `${dia} de ${nomeMes} de ${ano}`;
  }

  function formatarCPF(cpf) {
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      return cpf;
    }
  
    // Formata o CPF
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }


  return (
    <PDFContainer>
      <Header>
        <Title>CONTRATO DE COMPRA E VENDA DE MINÉRIOS E/OU PEDRAS PRECIOSAS E SEMIPRECIOSAS COM CLÁUSULA DE RECOMPRA E OUTRAS AVENÇAS</Title>
      </Header>
      <Content>
        <p>Pelo presente instrumento particular, as PARTES:</p>
        <p>
          <strong>1. HOLDING GOLDEN BRASIL</strong>, sociedade constituída sob as leis da República Federativa
          do Brasil, registrada sob o <strong>CNPJ 42.007.698/0001-17</strong>, com sede em Avenida Osvaldo Reis N°3281,
          Itajaí/SC, bem como sac@goldenbrasil.com.br, nesse ato representada pelo seu representante legal,
          doravante denominada <strong>“GOLDEN BRASIL”</strong>, e de outro lado;
        </p>
        <p>
          <strong>O ADQUIRENTE {userData.NAME}</strong>, pessoa física ou jurídica, capaz, devidamente qualificada conforme
          documentos em anexo, interessada em firmar o presente <strong>CONTRATO</strong>, a qual preencheu devidamente
          o cadastro na plataforma da GOLDEN BRASIL e encaminhou os seus respectivos documentos,
          doravante denominado simplesmente “USUÁRIO”;
        </p>
        <p>
          Sendo ambas as partes designadas, em conjunto, como “PARTES”, e isoladamente como “PARTE”.
          As partes acima identificadas têm, entre si, justos e acertado o presente contrato de compra e venda
          de produtos minerais que se regerá pelas cláusulas seguintes e pelas condições descritas no presente
          contrato.
        </p>

        <h2>CONSIDERAÇÕES PRELIMINARES:</h2>
        <p>
          Considerando que a <strong>GOLDEN BRASIL</strong>, nos termos da legislação em vigor, dispõe de uma
          plataforma especializada na compra e venda de minérios e pedras preciosas e semipreciosas;
        </p>

        <p>
          Considerando que a <strong>GOLDEN BRASIL</strong> é pessoa jurídica que se dedica à mineração e comércios de
          minérios e pedras preciosas e semipreciosas;
        </p>
        <p>
          Considerando que o <strong>USUÁRIO</strong> se declara conhecedor do mercado de minérios e pedras preciosas e
          semipreciosas em geral;
        </p>
        <p>
          Considerando que o <strong>USUÁRIO</strong> declara possuir plena capacidade civil, dispondo de todas as
          faculdades necessárias para firmar este CONTRATO e assumir as obrigações aqui previstas;
        </p>

        <p>
          As PARTES celebram o presente “Contrato de Compra e Venda de Minérios e Pedras Preciosas e
          Semipreciosas" <strong>#{lastId}</strong>, que se regerá pelas seguintes cláusulas e condições:
          {/* COLORCAR NUMERO DO CONTRATO  */}
        </p>

        <h3>CLÁUSULA 1 - DO OBJETO DO CONTRATO E CARACTERÍSTICAS DOS SERVIÇOS</h3>
        <p><strong>ARTIGO 1º.</strong> O presente <strong>CONTRATO</strong> tem por objeto a compra e venda de minérios e
          pedras preciosas e semipreciosas, disponibilizados pela <strong>GOLDEN BRASIL</strong>, com a
          possibilidade e garantia de recompra pela <strong>GOLDEN BRASIL</strong> ao final de um tempo pré-determinado
          durante 36 meses com recompra garantida ao final desse prazo e de acordo com o interesse do
          <strong> USUÁRIO</strong>.</p>
        <p><strong>ARTIGO 2º.</strong> A aquisição dos contratos minérios e/ou pedras preciosas e semipreciosas pelo
        <strong> USUÁRIO</strong> se dará de acordo com as condições de preço e quantidade as regras e condições
          estipuladas na proposta de contratação, firmada no momento da aquisição, a qual o <strong>USUÁRIO </strong>
          manifestará concordância.</p>
        <p><strong>ARTIGO 3º.</strong> A <strong>GOLDEN BRASIL</strong> poderá aceitar como forma de pagamento, a seu exclusivo
          critério, a permuta por outros minérios e/ou pedras preciosas ou semipreciosas, as quais, se aceitas,
          estarão informadas em seu portal oficial.</p>
        <p><strong>ARTIGO 4º.</strong> A <strong>GOLDEN BRASIL</strong> oferece ao <strong>USUÁRIO</strong> a possibilidade da entrega dos minérios
          e/ou pedras preciosas ao <strong>USUÁRIO</strong>.</p>
        <p><strong>ARTIGO 5º.</strong> Caso seja do interesse do <strong>USUÁRIO</strong>, a <strong>GOLDEN BRASIL</strong> poderá atuar na
          qualidade de depositária dos minérios e/ou pedras preciosas de propriedade do <strong>USUÁRIO</strong>,
          assegurando o bom estado e a conservação dos minérios e/ou pedras preciosas até que o <strong>USUÁRIO</strong>
          opte pela entrega ou pela revenda a ser efetivada à <strong>GOLDEN BRASIL</strong>.</p>
        <p><strong>ARTIGO 6º.</strong> A <strong>GOLDEN BRASIL</strong> assegura a possibilidade da recompra da totalidade dos
          contratos de minérios e/ou pedras preciosas ou semipreciosas adquiridos pelo <strong>USUÁRIO</strong>, de acordo
          com as regras e condições estabelecidas na proposta de contratação escolhida pelo <strong>USUÁRIO</strong> no
          momento da aquisição dos minérios e pedras preciosas ou semipreciosas, conforme consta no
          ANEXO I, cabendo ao <strong>USUÁRIO</strong>, caso queira, optar pelo direito de revenda à <strong>GOLDEN BRASIL</strong>.</p>
        <p><strong>ARTIGO 7º.</strong> Caso o <strong>USUÁRIO</strong> não deseje optar pela revenda de seus minérios e/ou pedras
          preciosas ou semipreciosas à <strong>GOLDEN BRASIL</strong>, poderá solicitar que a <strong>GOLDEN BRASIL</strong> envie ao
          <strong> USUÁRIO</strong> os mencionados bens, sendo que as custas de envio sejam a cargo do <strong>USUÁRIO</strong>, tais como
          transporte, embalagem e outros gastos pontuais relativos ao envio.</p>
        <p><strong>ARTIGO 8º.</strong> Como condição para a utilização da plataforma, o <strong>USUÁRIO</strong> se compromete a
          não utilizar a plataforma da <strong>GOLDEN BRASIL</strong> para fins diretos ou indiretos de (i) infringir qualquer
          lei, regulamento ou contrato, nem praticar atos contrários à moral e aos bons costumes; (ii) praticar
          lavagem de dinheiro; e/ou (iii) financiar atividades e/ou organizações que envolvam terrorismo,
          crime organizado, tráfico de drogas, pessoas e/ou órgãos humanos, estelionato e quaisquer outros
          crimes previstos no Código Penal Brasileiro, Legislação Especial ou Normas Internacionais.</p>
        <p><strong>ARTIGO 9º.</strong>A <strong>GOLDEN BRASIL</strong> esclarece que não custodia dinheiro e não faz arbitragem de ativos.</p>
        <p><strong>ARTIGO 10º.</strong> As PARTES se obrigam a cumprir fielmente a legislação que trata da prevenção
          e combate às atividades ligadas à ocultação de bens e lavagem de dinheiro.</p>

        <h3>CLÁUSULA 2 - DO CADASTRO</h3>

        <p><strong>ARTIGO 11º.</strong> Antes de iniciar seu relacionamento com a <strong>GOLDEN BRASIL</strong>, o <strong>USUÁRIO</strong> deverá
          fornecer todas as informações cadastrais solicitadas, enviando, solicitados pela <strong>GOLDEN BRASIL</strong>.</p>
        <p><strong>ARTIGO 12º.</strong> O <strong>USUÁRIO</strong> declara estar ciente e concorda que é de sua exclusiva
          responsabilidade manter seu cadastro permanentemente atualizado perante a <strong>GOLDEN BRASIL</strong>,
          podendo a <strong>GOLDEN BRASIL</strong> recusar qualquer ordem do <strong>USUÁRIO</strong> que não estiver devidamente
          cadastrado ou que estiver com seu cadastro desatualizado.</p>
        <p><strong>ARTIGO 13º.</strong>  O <strong>USUÁRIO</strong> concorda com o processamento de seus dados pessoais fornecidos
          no contexto deste CONTRATO para os fins aqui descritos e também concorda, até a revogação a
          qualquer momento do armazenamento de seus dados além do prazo acima.</p>

        <p className='maisProLado'>§ 1º. O presente contrato é também gerido pela Lei Geral de Proteção de Dados (LGPD), lei
          13.709.2018, Art. 7º e seguintes.</p>

        <p><strong>ARTIGO 14º.</strong> O preenchimento do questionário de aptidão é obrigatório para a contratação
          dos serviços, podendo a <strong>GOLDEN BRASIL</strong> se negar a aceitação do cadastro.</p>

        <h3>CLÁUSULA 3 - DAS REMUNERAÇÕES E TAXAS</h3>

        <p><strong>ARTIGO 15.</strong> A <strong>GOLDEN BRASIL</strong>  realizará a recompra dos contratos de minérios e/ou pedras
          preciosas ou semipreciosas negociados, ao final dos 36 meses de acordo com os valores da compra
          efetivada indicados neste contrato, podendo ser de forma escalonada.</p>
        <p><strong>ARTIGO 16.</strong> A <strong>GOLDEN BRASIL</strong> poderá realizar o pagamento parcelado e antecipado pela
          recompra dos contratos de minérios e/ou pedras preciosas ou semipreciosas negociados, de forma
          progressiva, ao longo dos 36 meses de contrato, com valorização de 50% ao ano de acordo com as
          solicitações do <strong>USUÁRIO</strong> de acordo com os valores na proposta comercial contratada, (Podendo
          optar pela recompra da valorização a cada 90 dias com uma taxa de saque de 4% ou; uma vez a
          cada ano sem taxas ou; utilizar o saldo para fazer recompras da valorização de contratos de minérios
          e produtos da <strong>GOLDEN BRASIL</strong> a cada 90 dias).</p>
        <p><strong>ARTIGO 17º.</strong> O <strong>USUÁRIO</strong> poderá vender seus contrato(s) minérios e/ou pedras preciosas ou
          semipreciosas negociados a terceiros a qualquer momento, desde que com o aval da <strong>GOLDEN
          BRASIL</strong>.</p>

        <h3>CLÁUSULA 4 - DAS OBRIGAÇÕES DO USUÁRIO</h3>

        <p><strong>ARTIGO 18º.</strong> O <strong>USUÁRIO</strong> será responsável e encontra-se ciente:</p>


        <p>
          <strong>§ 1º.</strong> Pelos atos que praticar e por suas omissões, bem como pela correição e veracidade
          dos documentos e informações apresentados, respondendo por todos os danos e prejuízos,
          diretos ou indiretos, eventualmente causados à <strong>GOLDEN BRASIL</strong> ou a terceiros, em
          especial com relação a quaisquer vícios relativos às informações e aos documentos
          necessários à prestação dos serviços ora contratados;
        </p>

        <p>
          <strong>§ 2º.</strong> Por cumprir a legislação, as regras e os procedimentos operacionais aplicáveis à
          realização de operações;

        </p>

        <p>
          <strong>§ 3º. </strong>Por assumir responsabilidade civil, tributária e criminal por todas e quaisquer
          informações prestadas à <strong>GOLDEN BRASIL</strong>;
        </p>

        <p>
          <strong>§ 4º.</strong> Que quaisquer prejuízos sofridos em decorrência de suas decisões de comprar, vender
          ou manter minérios e/ou pedras preciosas ou semipreciosas são de sua inteira
          responsabilidade, eximindo a <strong>GOLDEN BRASIL</strong> de quaisquer responsabilidades por
          eventuais perdas;
        </p>

        <h3>CLÁUSULA 5 - DAS RESPONSABILIDADE DA GOLDEN BRASIL</h3>

        <p><strong>ARTIGO 18º.</strong> A responsabilidade da <strong>GOLDEN BRASIL</strong> não abrange danos especiais, danos de
          terceiros ou lucro cessante, sendo que qualquer responsabilidade estará limitada às condições da
          transação constante da proposta de contratação.</p>

        <p><strong>ARTIGO 19º. A GOLDEN BRASIL</strong> não poderá ser responsabilizada por caso fortuito ou força
          maior, tais como, mas não se limitando a determinação de governos locais que impeçam a atividade
          da GOLDEN BRASIL, pandemias ou qualquer outro acontecimento de força maior.</p>


        <h3>CLÁUSULA 6 - DOS PRAZO E RESCISÃO</h3>

        <p><strong>ARTIGO 20º.</strong> O presente <strong>CONTRATO</strong> e os serviços a ele relacionados entram em vigor na data
          de confirmação do cadastro e desde que este instrumento tenha sido aceito eletronicamente,
          permanecendo em vigência por prazo indeterminado.</p>

        <p><strong>ARTIGO 21º.</strong> Este contrato pode ser rescindido a pedido de qualquer das partes, mediante
          solicitação da plataforma.</p>

        <p><strong>ARTIGO 22º.</strong> A mera rescisão do <strong>CONTRATO</strong> não impõe à <strong>GOLDEN BRASIL</strong> o dever de
          devolver os valores que lhe foram pagos pelo <strong>USUÁRIO</strong>, ou o dever de recomprar os contrato(s)
          minérios e/ou pedras preciosas ou semipreciosas adquiridos pelo <strong>USUÁRIO</strong>.</p>

        <h3>CLÁUSULA 7. DO FORO</h3>


        <p><strong>ARTIGO 23º.</strong> Para dirimir quaisquer controvérsias do contrato as partes elegem o foro da
          comarca de Itajaí/SC.</p>

        <h3>
          DISPOSIÇÕES GERAIS FINAIS
        </h3>

        <p><strong>I.</strong> Cada uma das pessoas que aceita o presente <strong>CONTRATO</strong> declara e garante que possui
          capacidade civil para fazê-lo ou para agir em nome da PARTE para a qual está assinando, vinculando
          essa PARTE e todos os que venham a apresentar reivindicações em nome dessa PARTE nos termos
          do presente instrumento.</p>
        <p><strong>II.</strong> Os direitos e obrigações decorrentes deste <strong>CONTRATO</strong> não poderão ser cedidos a terceiros
          por qualquer das PARTES, sem o prévio e expresso consentimento da outra PARTE.</p>
        <p><strong>III.</strong> Este <strong>CONTRATO</strong> é gravado com as cláusulas de irrevogabilidade e irretratabilidade,
          expressando, segundo seus termos e condições, a mais ampla vontade das PARTES.</p>
        <p><strong>IV.</strong> A nulidade de quaisquer das disposições ou cláusulas contidas neste <strong>CONTRATO</strong> não
          prejudicará as demais disposições nele contidas, as quais permanecerão válidas e produzirão seus
          regulares efeitos jurídicos, obrigando as PARTES.</p>
        <p><strong>V.</strong> Fica pactuado como garantia deste, minérios da <strong>GOLDEN BRASIL</strong> (Cobre, Mármore,
          Granito, Ouro, Areia e Diamantes), sendo sempre elencado o tipo e quantidade pela GOLDEN
          BRASIL, em caso de adversidades poderá ser acionado as garantias como forma de pagamento.</p>
        <p><strong>VI.</strong> Eventual tolerância de uma das PARTES com relação a qualquer infração ao presente
        <strong> CONTRATO</strong> cometida pela outra PARTE, não constituirá novação e nem renúncia aos direitos ou
          faculdades, tampouco alteração tácita deste <strong> CONTRATO</strong>, devendo ser considerada como mera
          liberalidade das PARTES.</p> 
        <p><strong>VII.</strong> Todos os avisos, comunicações ou notificações a serem efetuados no âmbito deste
        <strong>CONTRATO</strong>, terão de ser apresentados formalmente, sendo que o <strong>USUÁRIO</strong> está ciente e
          concorda que a comunicação da <strong>GOLDEN BRASIL</strong> será exclusivamente por e-mail, através do
          endereço indicado pelo <strong>USUÁRIO</strong> no momento de contratação dos serviços ou outro indicado
          posteriormente, sendo considerando-se válidas todas as comunicações enviadas em tal correio
          eletrônico, disponibilizando ainda a Golden o e-mail sac@goldenbrasil.com.br.</p>
       


        <p><strong>ITAJAI SC, {formatarData(dataAtual)}</strong></p>

        
      </Content>
      <Signature>
        <SignatureBlock>
          <div>{assinatura === "assinado" ? userData.NAME + " - " + formatarCPF(userData.CPF) : ""}</div>
          <div className='borderLine'></div>
          <div>Assinatura do Comprador(a)</div>
        </SignatureBlock>
        <SignatureBlock>
          <AssinaturaGolden src='golden-assinatura.png' />
          <div className='borderLine'></div>
          <div>Assinatura do Vendedor</div>
        </SignatureBlock>
      </Signature>
    </PDFContainer>
  );
};

export default PDFGenerator;