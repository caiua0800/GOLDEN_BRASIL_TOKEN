import React, { useContext, useImperativeHandle } from 'react';
import jsPDF from 'jspdf';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment-timezone';

const golden_img_assinatura = 'golden-assinatura.png'; 

const PDFGenerator = React.forwardRef(({ modalData, lastId }, ref) => {
  const { userData } = useContext(AuthContext);

  const convertImageToBase64 = (imagePath) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imagePath;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = (error) => {
        reject(error);
      };
    });
  };

  useImperativeHandle(ref, () => ({
    downloadPDF: async () => {
      const doc = new jsPDF();
      const dataAtual = moment.tz("America/Sao_Paulo").format('DD/MM/YYYY');

      let y = 20;
      const lineHeight = 10;
      const marginY = 20; // Margem em cima e embaixo
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;

      const addText = (text, x = 10) => {
        const splitText = doc.splitTextToSize(text, pageWidth - 20);
        splitText.forEach(line => {
          if (y + lineHeight > pageHeight - marginY) {
            doc.addPage();
            y = marginY; // Resetar 'y' para a margem superior após adicionar uma nova página
          }
          doc.text(line, x, y);
          y += lineHeight;
        });
      };

      // TÍTULO
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      const title = `CONTRATO DE COMPRA E VENDA DE MINÉRIOS E/OU PEDRAS PRECIOSAS E SEMIPRECIOSAS COM CLÁUSULA DE RECOMPRA E OUTRAS AVENÇAS CONTRATO #${modalData.IDCOMPRA}`;
      addText(title);

      // INÍCIO DO CONTRATO
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      addText(`Pelo presente instrumento particular, as PARTES:`);
      addText(`1. HOLDING GOLDEN BRASIL, sociedade constituída sob as leis da República Federativa do Brasil, registrada sob o CNPJ 42.007.698/0001-17, com sede em Avenida Osvaldo Reis N°3281, Itajaí/SC, bem como sac@goldenbrasil.com.br, nesse ato representada pelo seu representante legal, doravante denominada “GOLDEN BRASIL”, e de outro lado:`);
      addText(`O ADQUIRENTE ${userData.NAME}, pessoa física ou jurídica, capaz, devidamente qualificada conforme documentos em anexo, interessada em firmar o presente CONTRATO, a qual preencheu devidamente o cadastro na plataforma da GOLDEN BRASIL e encaminhou os seus respectivos documentos, doravante denominado simplesmente “USUÁRIO”;`);
      addText(`Sendo ambas as partes designadas, em conjunto, como “PARTES”, e isoladamente como “PARTE”.`);
      addText(`As partes acima identificadas têm, entre si, justos e acertado o presente contrato de compra e venda de produtos minerais que se regerá pelas cláusulas seguintes e pelas condições descritas no presente contrato.`);
      
      addText(`CONSIDERAÇÕES PRELIMINARES:`);
      addText(`Considerando que a GOLDEN BRASIL, nos termos da legislação em vigor, dispõe de uma plataforma especializada na compra e venda de minérios e pedras preciosas e semipreciosas;`);
      addText(`Considerando que a GOLDEN BRASIL é pessoa jurídica que se dedica à mineração e comércios de minérios e pedras preciosas e semipreciosas;`);
      addText(`Considerando que o USUÁRIO se declara conhecedor do mercado de minérios e pedras preciosas e semipreciosas em geral;`);
      addText(`Considerando que o USUÁRIO declara possuir plena capacidade civil, dispondo de todas as faculdades necessárias para firmar este CONTRATO e assumir as obrigações aqui previstas;`);
      addText(`As PARTES celebram o presente “Contrato de Compra e Venda de Minérios e Pedras Preciosas e Semipreciosas" #${lastId}, que se regerá pelas seguintes cláusulas e condições:`);

      // CLÁUSULAS
      addText(`CLÁUSULA 1 - DO OBJETO DO CONTRATO E CARACTERÍSTICAS DOS SERVIÇOS`);
      addText(`ARTIGO 1º. O presente CONTRATO tem por objeto a compra e venda de minérios e pedras preciosas e semipreciosas, disponibilizados pela GOLDEN BRASIL, com a possibilidade e garantia de recompra pela GOLDEN BRASIL ao final de`)
      addText(`36 meses, com recompra garantida ao final desse prazo e de acordo com o interesse do USUÁRIO.`);
      addText(`ARTIGO 2º. A aquisição dos contratos de minérios e/ou pedras preciosas e semipreciosas pelo USUÁRIO se dará de acordo com as condições de preço e quantidade as regras e condições estipuladas na proposta de contratação, firmada no momento da aquisição, a qual o USUÁRIO manifestará concordância.`);
      addText(`ARTIGO 3º. A GOLDEN BRASIL poderá aceitar como forma de pagamento, a seu exclusivo critério, a permuta por outros minérios e/ou pedras preciosas ou semipreciosas, as quais, se aceitas, estarão informadas em seu portal oficial.`);
      addText(`ARTIGO 4º. A GOLDEN BRASIL oferece ao USUÁRIO a possibilidade da entrega dos minérios e/ou pedras preciosas ao USUÁRIO.`);
      addText(`ARTIGO 5º. Caso seja do interesse do USUÁRIO, a GOLDEN BRASIL poderá atuar na qualidade de depositária dos minérios e/ou pedras preciosas de propriedade do USUÁRIO, assegurando o bom estado e a conservação dos minérios e/ou pedras preciosas até que o USUÁRIO opte pela entrega ou pela revenda a ser efetivada à GOLDEN BRASIL.`);
      addText(`ARTIGO 6º. A GOLDEN BRASIL assegura a possibilidade da recompra da totalidade dos contratos de minérios e/ou pedras preciosas ou semipreciosas adquiridos pelo USUÁRIO, de acordo com as regras e condições estabelecidas na proposta de contratação escolhida pelo USUÁRIO no momento da aquisição dos minérios e pedras preciosas ou semipreciosas, conforme consta no ANEXO I, cabendo ao USUÁRIO, caso queira, optar pelo direito de revenda à GOLDEN BRASIL.`);
      addText(`ARTIGO 7º. Caso o USUÁRIO não deseje optar pela revenda de seus minérios e/ou pedras preciosas ou semipreciosas à GOLDEN BRASIL, poderá solicitar que a GOLDEN BRASIL envie ao USUÁRIO os mencionados bens, sendo que as custas de envio sejam a cargo do USUÁRIO, tais como transporte, embalagem e outros gastos pontuais relativos ao envio.`);
      addText(`ARTIGO 8º. Como condição para a utilização da plataforma, o USUÁRIO se compromete a não utilizar a plataforma da GOLDEN BRASIL para fins diretos ou indiretos de (i) infringir qualquer lei, regulamento ou contrato, nem praticar atos contrários à moral e aos bons costumes; (ii) praticar lavagem de dinheiro; e/ou (iii) financiar atividades e/ou organizações que envolvam terrorismo, crime organizado, tráfico de drogas, pessoas e/ou órgãos humanos, estelionato e quaisquer outros crimes previstos no Código Penal Brasileiro, Legislação Especial ou Normas Internacionais.`);
      addText(`ARTIGO 9º. A GOLDEN BRASIL esclarece que não custodia dinheiro e não faz arbitragem de ativos.`);
      addText(`ARTIGO 10º. As PARTES se obrigam a cumprir fielmente a legislação que trata da prevenção e combate às atividades ligadas à ocultação de bens e lavagem de dinheiro.`);

      addText(`CLÁUSULA 2 - DO CADASTRO`);
      addText(`ARTIGO 11º. Antes de iniciar seu relacionamento com a GOLDEN BRASIL, o USUÁRIO deverá fornecer todas as informações cadastrais solicitadas, enviadas e solicitadas pela GOLDEN BRASIL.`);
      addText(`ARTIGO 12º. O USUÁRIO declara estar ciente e concorda que é de sua exclusiva responsabilidade manter seu cadastro permanentemente atualizado perante a GOLDEN BRASIL, podendo a GOLDEN BRASIL recusar qualquer ordem do USUÁRIO que não estiver devidamente cadastrado ou que estiver com seu cadastro desatualizado.`);
      addText(`ARTIGO 13º. O USUÁRIO concorda com o processamento de seus dados pessoais fornecidos no contexto deste CONTRATO para os fins aqui descritos e também concorda, até a revogação a qualquer momento do armazenamento de seus dados além do prazo acima.`);
      addText(`§ 1º. O presente contrato é também gerido pela Lei Geral de Proteção de Dados (LGPD), lei 13.709.2018, Art. 7º e seguintes.`);
      addText(`ARTIGO 14º. O preenchimento do questionário de aptidão é obrigatório para a contratação dos serviços, podendo a GOLDEN BRASIL se negar a aceitação do cadastro.`);

      addText(`CLÁUSULA 3 - DAS REMUNERAÇÕES E TAXAS`);
      addText(`ARTIGO 15. A GOLDEN BRASIL realizará a recompra dos contratos de minérios e/ou pedras preciosas ou semipreciosas negociados, ao final dos 36 meses de acordo com os valores da compra efetivada indicados neste contrato, podendo ser de forma escalonada.`);
      addText(`ARTIGO 16. A GOLDEN BRASIL poderá realizar o pagamento parcelado e antecipado pela recompra dos contratos de minérios e/ou pedras preciosas ou semipreciosas negociados, de forma progressiva, ao longo dos 36 meses de contrato, com valorização de 50% ao ano de acordo com as solicitações do USUÁRIO de acordo com os valores na proposta comercial contratada, (Podendo optar pela recompra da valorização a cada 90 dias com uma taxa de saque de 4% ou; uma vez a cada ano sem taxas ou; utilizar o saldo para fazer recompras da valorização de contratos de minérios e produtos da GOLDEN BRASIL a cada 90 dias).`);
      addText(`ARTIGO 17º. O USUÁRIO poderá vender seus contrato(s) de minérios e/ou pedras preciosas ou semipreciosas negociados a terceiros a qualquer momento, desde que com o aval da GOLDEN BRASIL.`);

      addText(`CLÁUSULA 4 - DAS OBRIGAÇÕES DO USUÁRIO`);
      addText(`ARTIGO 18º. O USUÁRIO será responsável e encontra-se ciente:`);
      addText(`§ 1º. Pelos atos que praticar e por suas omissões, bem como pela correção e veracidade dos documentos e informações apresentados, respondendo por todos os danos e prejuízos, diretos ou indiretos, eventualmente causados à GOLDEN BRASIL ou a terceiros, em especial com relação a quaisquer vícios relativos às informações e aos documentos necessários à prestação dos serviços ora contratados;`);
      addText(`§ 2º. Por cumprir a legislação, as regras e os procedimentos operacionais aplicáveis à realização de operações;`);
      addText(`§ 3º. Por assumir responsabilidade civil, tributária e criminal por todas e quaisquer informações prestadas à GOLDEN BRASIL;`);
      addText(`§ 4º. Que quaisquer prejuízos sofridos em decorrência de suas decisões de comprar, vender ou manter minérios e/ou pedras preciosas ou semipreciosas são de sua inteira responsabilidade, eximindo a GOLDEN BRASIL de quaisquer responsabilidades por eventuais perdas;`);

      addText(`CLÁUSULA 5 - DAS RESPONSABILIDADES DA GOLDEN BRASIL`);
      addText(`ARTIGO 19º. A responsabilidade da GOLDEN BRASIL não abrange danos especiais, danos de terceiros ou lucro cessante, sendo que qualquer responsabilidade estará limitada às condições da transação constante da proposta de contratação.`);
      addText(`ARTIGO 20º. A GOLDEN BRASIL não poderá ser responsabilizada por caso fortuito ou força maior, tais como, mas não se limitando a determinação de governos locais que impeçam a atividade da GOLDEN BRASIL, pandemias ou qualquer outro acontecimento de força maior.`);

      addText(`CLÁUSULA 6 - DOS PRAZOS E RESCISÃO`);
      addText(`ARTIGO 21º. O presente CONTRATO e os serviços a ele relacionados entram em vigor na data de confirmação do cadastro e desde que este instrumento tenha sido aceito eletronicamente, permanecendo em vigência por prazo indeterminado.`);
      addText(`ARTIGO 22º. Este contrato pode ser rescindido a pedido de qualquer das partes, mediante solicitação da plataforma.`);
      addText(`ARTIGO 23º. A mera rescisão do CONTRATO não impõe à GOLDEN BRASIL o dever de devolver os valores que lhe foram pagos pelo USUÁRIO, ou o dever de recomprar os contrato(s) de minérios e/ou pedras preciosas ou semipreciosas adquiridos pelo USUÁRIO.`);

      addText(`CLÁUSULA 7 - DO FORO`);
      addText(`ARTIGO 24º. Para dirimir quaisquer controvérsias do contrato as partes elegem o foro da comarca de Itajaí/SC.`);

      addText(`DISPOSIÇÕES GERAIS FINAIS`);
      addText(`I. Cada uma das pessoas que aceita o presente CONTRATO declara e garante que possui capacidade civil para fazê-lo ou para agir em nome da PARTE para a qual está assinando, vinculando essa PARTE e todos os que venham a apresentar reivindicações em nome dessa PARTE nos termos do presente instrumento.`);
      addText(`II. Os direitos e obrigações decorrentes deste CONTRATO não poderão ser cedidos a terceiros por qualquer das PARTES, sem o prévio e expresso consentimento da outra PARTE.`);
      addText(`III. Este CONTRATO é gravado com as cláusulas de irrevogabilidade e irretratabilidade, expressando, segundo seus termos e condições, a mais ampla vontade das PARTES.`);
      addText(`IV. A nulidade de quaisquer das disposições ou cláusulas contidas neste CONTRATO não prejudicará as demais disposições nele contidas, as quais permanecerão válidas e produzirão seus regulares efeitos jurídicos, obrigando as PARTES.`);
      addText(`V. Fica pactuado como garantia deste, minérios da GOLDEN BRASIL (Cobre, Mármore, Granito, Ouro, Areia e Diamantes), sendo sempre elencado o tipo e quantidade pela GOLDEN BRASIL, em caso de adversidades poderá ser acionado as garantias como forma de pagamento.`);
      addText(`VI. Eventual tolerância de uma das PARTES com relação a qualquer infração ao presente CONTRATO cometida pela outra PARTE, não constituirá novação e nem renúncia aos direitos ou faculdades, tampouco alteração tácita deste CONTRATO, devendo ser considerada como mera liberalidade das PARTES.`);
      addText(`VII. Todos os avisos, comunicações ou notificações a serem efetuados no âmbito deste CONTRATO, terão de ser apresentados formalmente, sendo que o USUÁRIO está ciente e concorda que a comunicação da GOLDEN BRASIL será exclusivamente por e-mail, através do endereço indicado pelo USUÁRIO no momento de contratação dos serviços ou outro indicado posteriormente, sendo consideradas válidas todas as comunicações enviadas em tal correio eletrônico, disponibilizando ainda a GOLDEN BRASIL o e-mail sac@goldenbrasil.com.br.`);

      addText(`ITAJAI SC, ${dataAtual}`);

      // Adicionando Assinaturas
      y += lineHeight * 2;
      addText('________________________________________');
      addText(`${userData.NAME}`);
      addText('Assinatura do Comprador(a)');
      y += lineHeight * 2;

      const base64Image = await convertImageToBase64(golden_img_assinatura);
      if (base64Image) {
        // Adicionando a imagem convertida ao PDF
        const imgWidth = 100; // Largura da imagem em mm
        const imgHeight = 35; // Proporção
        doc.addImage(base64Image, 'PNG', 10, y, imgWidth, imgHeight);
        y += imgHeight + lineHeight; // Ajusta a posição 'y' após adicionar a imagem
      }

      addText('________________________________________');
      addText('Assinatura do Vendedor');

      // Salvar o PDF
      doc.save('contrato.pdf');
    }
  }));

  return null;
});

export default PDFGenerator;
