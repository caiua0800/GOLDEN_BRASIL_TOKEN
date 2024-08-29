import React, { useState, useEffect, useContext } from "react";
import * as S from './RelatorioStyle';
import SideBarBox from "../Sidebar/SideBarBox";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { usePulse } from "../../context/LoadContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const BASE = process.env.REACT_APP_BASE_ROUTE;
const DESTIN = process.env.REACT_APP_RELATORIO;

export default function Relatorio() {
    const { userData } = useContext(AuthContext);
    const [dateIn, setDateIn] = useState("");
    const [dateOut, setDateOut] = useState("");
    const [serverResponseContracts, setServerResponseContracts] = useState([]);
    const { showPulse, hidePulse } = usePulse();

    const handleGetFilteredRelatorio = async () => {
        showPulse();

        if (dateIn === "" || dateOut === "") {
            hidePulse();
            alert("Insira as datas de início e término.");
            return;
        }

        try {
            const response = await axios.post(`${BASE}${DESTIN}`, {
                clientId: userData.CPF,
                dateIn: dateIn,
                dateOut: dateOut
            });
            setServerResponseContracts(response.data);
            hidePulse();
        } catch (error) {
            setServerResponseContracts([]);
            hidePulse();
        }
    }

    function formatDate(dateString) {
        const [datePart] = dateString.split(' ');
        const [year, month, day] = datePart.split('-');
        return `${day}/${month}/${year}`;
    }

    const handleSumAll = () => {
        let sum = 0;
        if (serverResponseContracts.length > 0) {
            serverResponseContracts.forEach(contract => {
                sum += ((contract.RENDIMENTO_ATUAL / 100) * contract.TOTALSPENT);
            });
        }
        return sum.toFixed(2);
    }

    const downloadPDF = () => {
        const input = document.getElementById('pdfContent'); // ID do conteúdo a ser gerado em PDF

        html2canvas(input, {
            scale: 2, // Aumenta a escala da captura
            useCORS: true, // Permite usar imagens de outros domínios
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190; // Largura da imagem no PDF
            const pageHeight = 295; // Altura da página A4 em mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
        
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save('relatorio_de_valorizacao.pdf');
        });
        
    };

    return (
        <SideBarBox>
            <S.RelatorioContainer>
                <S.LoginBehind src='logo-golden.png' />
                <S.PrincipalContent>
                    <S.TitleInitial>EMISSÃO DO RELATÓRIO DE VALORIZAÇÃO</S.TitleInitial>
                    <S.RelatorioContent>
                        <S.Filters>
                            <S.RelatorioInputBox>
                                <span>DATA DE INÍCIO</span>
                                <input
                                    type="date"
                                    value={dateIn}
                                    onChange={(e) => setDateIn(e.target.value)}
                                />
                            </S.RelatorioInputBox>
                            <S.RelatorioInputBox>
                                <span>DATA DE TÉRMINO</span>
                                <input
                                    type="date"
                                    value={dateOut}
                                    onChange={(e) => setDateOut(e.target.value)}
                                />
                            </S.RelatorioInputBox>
                        </S.Filters>

                        {dateIn !== "" && dateOut !== "" && (
                            <S.ButtonGenerate onClick={handleGetFilteredRelatorio}>GERAR RELATÓRIO</S.ButtonGenerate>
                        )}

                        {serverResponseContracts.length > 0 && (
                            <>
                                <S.PDFModel id="pdfContent"> {/* Adicionando ID aqui */}
                                    <S.PdfTitle>RELATÓRIO DE VALORIZAÇÃO - GOLDEN TOKEN BRASIL</S.PdfTitle>
                                    <S.PdfSubTitle>CONTRATOS</S.PdfSubTitle>

                                    <S.Table>
                                        <thead>
                                            <tr>
                                                <th>DATA COMPRA</th>
                                                <th>VALOR COMPRA</th>
                                                <th>LUCRO OBTIDO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {serverResponseContracts.map(contract => (
                                                <tr key={contract.IDCOMPRA}>
                                                    <td>{formatDate(contract.PURCHASEDATE)}</td>
                                                    <td>R${contract.TOTALSPENT}</td>
                                                    <td>R${((contract.RENDIMENTO_ATUAL / 100) * contract.TOTALSPENT).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </S.Table>
                                    <S.TotalSum>
                                        <p>TOTAL LUCRO ENTRE {formatDate(dateIn)} e {formatDate(dateOut)}</p>
                                        <span>R${handleSumAll()}</span>
                                    </S.TotalSum>

                                    <S.HoldingGoldenGate>
                                        HOLDING GOLDEN BRASIL LTDA<br />
                                        AV. BRIGADEIRO FARIA LIMA, 1461 – ANDAR 4<br />
                                        SÃO PAULO – SP<br />
                                        CNPJ: 42.007.698/0001-17<br />
                                    </S.HoldingGoldenGate>
                                </S.PDFModel>
                                <S.DownloadPDF onClick={downloadPDF}>DOWNLOAD</S.DownloadPDF>
                            </>
                        )}
                    </S.RelatorioContent>
                </S.PrincipalContent>
            </S.RelatorioContainer>
        </SideBarBox>
    );
}
