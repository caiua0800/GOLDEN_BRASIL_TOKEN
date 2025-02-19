import React, { useState, useEffect, useContext } from "react";
import * as S from './RelatorioStyle';
import SideBarBox from "../Sidebar/SideBarBox";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { usePulse } from "../../context/LoadContext";
import html2pdf from 'html2pdf.js';
import { formatNumber } from "../../assets/utils";

const BASE = process.env.REACT_APP_BASE_ROUTE;
const DESTIN = process.env.REACT_APP_RELATORIO;

export default function Relatorio() {
    const { userData } = useContext(AuthContext);
    const [dateIn, setDateIn] = useState("");
    const [dateOut, setDateOut] = useState("");
    const [serverResponseContracts, setServerResponseContracts] = useState([]);
    const { showPulse, hidePulse } = usePulse();
    const [sortedContracts, setSortedContracts] = useState([]);
    const [contratosEsseAninho, setContratosEsseAninho] = useState([]);

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

    const sortContractsByDate = (contracts) => {
        return [...contracts].sort((a, b) => {
            return new Date(a.PURCHASEDATE) - new Date(b.PURCHASEDATE);
        });
    };

    useEffect(() => {
        setSortedContracts(sortContractsByDate(serverResponseContracts));
    }, [serverResponseContracts]);

    const obterContratosPorAno = () => {
        const contratosEsseAno = [];
        if (userData.CONTRATOS && userData.CONTRATOS.length > 0) {
            userData.CONTRATOS.forEach(contrato => {
                if (contrato && contrato.STATUS && (contrato.STATUS === 1 || contrato.STATUS === 2)) {
                    if (contrato.STATUS === 1) {
                        const dataHoje = new Date();
                        const dataInicio = new Date('2024-01-01');
                        const diffTime = Math.abs(dataHoje - dataInicio);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        var valorizacaoTotal = (parseFloat(contrato.MAXIMUMQUOTAYIELD) /
                            (parseFloat(contrato.MAXIMUMNUMBEROFDAYSTOYIELD) * 30)) * diffDays;

                        var valorizacaoTotalDinheiro = (valorizacaoTotal / 100) *
                            parseFloat(contrato.TOTALSPENT > contrato.TOTALSPENTFEE ? contrato.TOTALSPENT : contrato.TOTALSPENTFEE);

                        var valorPlus = 0;
                        if (userData.PLUS && userData.PLUS.length > 0) {
                            userData.PLUS.forEach(p => {
                                if(parseFloat(p.IDCOMPRA) === parseFloat(contrato.IDCOMPRA)){
                                    valorPlus += parseFloat(p.value_multiplied);
                                }
                            })
                        }

                        contratosEsseAno.push({ ctrId: contrato.IDCOMPRA, value: (valorizacaoTotalDinheiro + valorPlus) || 0 });
                    }
                }
            });
        }

        if (contratosEsseAno && contratosEsseAno.length > 0) {
            setContratosEsseAninho(contratosEsseAno);
        }
    }

    useEffect(() => {
        obterContratosPorAno();
    }, []);

    const gerarPDF = () => {
        const element = document.getElementById('relatorioPDF');
        const opt = {
            margin: 1,
            filename: 'relatorio2024.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Gera o PDF a partir do elemento HTML
        html2pdf().from(element).set(opt).save();
    };

    return (
        <SideBarBox>
            <S.RelatorioContainer id="relatorio">
                <S.LoginBehind src='logo-golden.png' />
                <S.PrincipalContent id="relatorioPDF">
                    <S.RelatorioPDF>
                        <S.Titulo>RELATÓRIO DE VALORIZAÇÃO 🧾</S.Titulo>
                        <S.SessaoTitulo>Referente 2024</S.SessaoTitulo>

                        <S.ContratosDoRelatorio>
                            <S.ContratoItem>
                                <span className="item1">ID DO CONTRATO</span>
                                <span className="item2">VALORIZAÇÃO DE 2024 (R$)</span>
                            </S.ContratoItem>
                            {contratosEsseAninho && contratosEsseAninho.map(ctrAninho => (
                                <S.ContratoItem key={ctrAninho.ctrId}>
                                    <span className="item1">#{ctrAninho.ctrId}</span>
                                    <span className="item2">R${formatNumber(ctrAninho.value)}</span>
                                </S.ContratoItem>
                            ))}
                        </S.ContratosDoRelatorio>
                        <S.BotaoGerarImprimirPDF>
                            <button onClick={gerarPDF}>Imprimir</button>
                        </S.BotaoGerarImprimirPDF>
                    </S.RelatorioPDF>
                </S.PrincipalContent>
            </S.RelatorioContainer>
        </SideBarBox>
    );
}