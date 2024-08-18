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
      let y = 30;

      doc.text(`Eu, ${userData.NAME}, inscrito(a) no CPF sob o número ${userData.CPF}, doravante denominado(a) como Comprador(a), declaro que adquiri um total de ${qttContratos} contratos, cada um no valor de U$${formatNumber(valorPorContrato)}.`, 10, y, { maxWidth: 180 });
      y += lineHeight * 2; // Espaçamento entre linhas

      doc.text(`O presente contrato terá uma duração de ${meses} meses e ${dias} dias, durante os quais o Comprador(a) terá direito a um lucro diário estimado em U$${formatNumber(lucroDiario)}, totalizando um lucro final de U$${formatNumber(lucroTotal)}.`, 10, y, { maxWidth: 180 });
      y += lineHeight * 2;

      doc.text(`A porcentagem total de lucro ao final do contrato será de ${porcentagemLucro}%, conforme estipulado nas cláusulas do contrato firmado entre as partes.`, 10, y, { maxWidth: 180 });
      y += lineHeight * 2;

      doc.text(`Este documento serve como comprovante das condições acordadas e deve ser assinado por ambas as partes para que o contrato tenha validade legal.`, 10, y, { maxWidth: 180 });
      y += lineHeight * 3; // Espaço extra antes das assinaturas

      // Assinaturas
      doc.text('________________________________________', 10, y);
      doc.text(`${userData.NAME}`, 10, y + lineHeight);
      doc.text('Assinatura do Comprador(a)', 10, y + lineHeight * 2);
      y += lineHeight * 4;

      doc.text('________________________________________', 10, y);
      doc.text('Assinatura do Vendedor', 10, y + lineHeight);

      // Salvar o PDF
      doc.save('contrato.pdf');
    }
  }));

  return null;
});

export default PDFGenerator;
