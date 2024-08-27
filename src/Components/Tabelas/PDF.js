import React, { useContext, useImperativeHandle } from 'react';
import jsPDF from 'jspdf';
import { AuthContext } from '../../context/AuthContext';
import { formatNumber } from '../../assets/utils';

const PDFGenerator = React.forwardRef(({ modalData }, ref) => {
  const { userData } = useContext(AuthContext);

  useImperativeHandle(ref, () => ({
    downloadPDF: () => {
      const { meses, dias, lucroDiario, lucroTotal, porcentagemLucro, qttContratos, valorPorContrato } = modalData || {};
      const doc = new jsPDF();

      // Configuração do título
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text('Contrato de Compra e Venda', 10, 20);

      // Configuração do corpo do texto
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0);

      const lineHeight = 10;
      const marginY = 20;
      const pageHeight = doc.internal.pageSize.height;
      let y = 30;

      const addText = (text, x = 10) => {
        const splitText = doc.splitTextToSize(text, 180);
        splitText.forEach(line => {
          if (y + lineHeight > pageHeight - marginY) {
            doc.addPage();
            y = marginY;
          }
          doc.text(line, x, y);
          y += lineHeight;
        });
      };

      addText(`Eu, ${userData.NAME}, inscrito(a) no CPF sob o número ${userData.CPF}, doravante denominado(a) como Comprador(a), declaro que adquiri um total de ${qttContratos} contratos, cada um no valor de R$${formatNumber(valorPorContrato)}.`);
      y += lineHeight;

      addText(`O presente contrato terá uma duração de ${meses} meses e ${dias} dias, durante os quais o Comprador(a) terá direito a um lucro diário estimado em R$${formatNumber(lucroDiario)}, totalizando um lucro final de R$${formatNumber(lucroTotal)}.`);
      y += lineHeight;

      addText(`A porcentagem total de lucro ao final do contrato será de ${porcentagemLucro}%, conforme estipulado nas cláusulas do contrato firmado entre as partes.`);
      y += lineHeight;

      addText(`Este documento serve como comprovante das condições acordadas e deve ser assinado por ambas as partes para que o contrato tenha validade legal.`);
      y += lineHeight * 2;

      // Seção PROPOSTA COMERCIAL – ANEXO I
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      addText('PROPOSTA COMERCIAL – ANEXO I');
      y += lineHeight;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      addText('Exemplo 01 Token de USD $ 74,91');
      y += lineHeight * 2;

      // Tabela
      const tableHeaders = ['Ano', 'Valor 1 Saque Anual', 'Valor Vários Saques'];
      const tableRows = [
        ['1º Ano', '37,45', '35,95'],
        ['2º Ano', '37,45', '35,95'],
        ['3º Ano', '37,45', '35,95'],
      ];

      const addTable = () => {
        const tableStartX = 10;
        const columnWidths = [40, 80, 80];

        // Desenha o cabeçalho
        tableHeaders.forEach((header, i) => {
          if (y + lineHeight > pageHeight - marginY) {
            doc.addPage();
            y = marginY;
          }
          doc.text(header, tableStartX + columnWidths.slice(0, i).reduce((acc, w) => acc + w, 0), y);
        });

        y += lineHeight;

        // Desenha as linhas da tabela
        tableRows.forEach(row => {
          row.forEach((cell, i) => {
            if (y + lineHeight > pageHeight - marginY) {
              doc.addPage();
              y = marginY;
            }
            doc.text(cell, tableStartX + columnWidths.slice(0, i).reduce((acc, w) => acc + w, 0), y);
          });
          y += lineHeight;
        });
      };

      addTable();
      y += lineHeight * 2;

      // Texto adicional após a tabela
      addText(`Total Final a ser pago pela Golden Token Brasil: R$${formatNumber((porcentagemLucro / 100) * (parseFloat(qttContratos) * parseFloat(valorPorContrato)))}`);
      y += lineHeight;

      addText(`Cada unidade de GOLDEN TOKEN BRASIL corresponde, alternativamente, a seguinte fração de minérios:`);
      y += lineHeight;

      addText(`01 GOLDEN TOKEN BRASIL equivale = 10kg Cobre Brutos; ou 01 Golden Token equivale = 5 a 10 pontos de Diamante Brutos; ou 01 GOLDEN TOKEN BRASIL equivale = 2 metros de Granito Branco Bruto, ou Outros minérios conforme disponibilidade da extração ou estoque.`);
      y += lineHeight * 2;

      addText(`As solicitações de saques são feitas no aniversário de 3 meses da primeira valorização de cada compra, nessa data se abrirá uma janela de solicitação de saque por 48 horas onde o USUÁRIO definirá se efetua a solicitação saque ou não. Para concluir a solicitação da compra você deve ter acumulado 25 dólares ou mais. Os pagamentos das solicitações serão efetuados no dia 01 de cada mês, caso não sejam dias úteis, será efetuado nos próximos dias úteis subsequentes.`);
      y += lineHeight * 2;

      // Assinaturas
      addText('________________________________________');
      addText(`${userData.NAME}`);
      addText('Assinatura do Comprador(a)');
      y += lineHeight * 2;

      addText('________________________________________');
      addText('Assinatura do Vendedor');

      // Salvar o PDF
      doc.save('contrato.pdf');
    }
  }));

  return null;
});

export default PDFGenerator;