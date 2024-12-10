import React, { useContext, useState, useEffect, useRef } from 'react';
import * as Style from './TabelaValorizacaoStyle';
import { formatDateSystem, formatNumber } from '../../assets/utils';
import { AuthContext } from '../../context/AuthContext';
import PDFGenerator from './PDF';

const linkContaDeposito = '/ContaDeDeposito';

const TabelaValorizacao = () => {
    const [contratos, setContratos] = useState([]);
    const { userData } = useContext(AuthContext);
    const [modalData, setModalData] = useState(null);
    const [selecionada, setSelecionada] = useState(null)
    const pdfRef = useRef();


    useEffect(() => {
        if (userData && Array.isArray(userData.CONTRATOS)) {
            // Filtrando contratos para não incluir aqueles que têm SALDO_SACADO_RECOMPRA definido
            const filteredContratos = userData.CONTRATOS.filter(contrato => !contrato.SALDO_SACADO_RECOMPRA);
            const sortedContratos = filteredContratos.sort((a, b) => a.IDCOMPRA - b.IDCOMPRA);
            setContratos(sortedContratos);
        } else {
            setContratos([]);
        }
    }, [userData]);

    useEffect(() => {
        if (modalData !== null) {
            console.log(modalData)
            pdfRef.current.downloadPDF();
        }
    }, [modalData]);

    const handleSelecionar = (c) => {
        if (selecionada === c)
            setSelecionada(null);
        else
            setSelecionada(c);
    }

    function getDateBasedOnTime(st) {
        if (st != 1)
            return "----";

        const now = new Date();
        const options = { timeZone: 'America/Sao_Paulo', hour12: false, hour: '2-digit', minute: '2-digit' };
        const formatter = new Intl.DateTimeFormat('pt-BR', options);
        const timeString = formatter.format(now);

        // Extrai a hora e o minuto
        const [hour, minute] = timeString.split(':').map(Number);

        // Verifica se já passou das 02:00
        const today = now.toLocaleDateString('pt-BR'); // Data de hoje

        if (hour >= 2) {
            return today; // Retorna a data de hoje
        } else {
            // Para a data de ontem
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() - 1);
            return yesterday.toLocaleDateString('pt-BR'); // Retorna a data de ontem
        }
    }

    const handleLucroTotalOntem = (contrato) => {
        if(contrato){
            var valorizacao_diaria = 0;

            valorizacao_diaria = (contrato.MAXIMUMQUOTAYIELD)/(contrato.MAXIMUMNUMBEROFDAYSTOYIELD * 30);

            var valorizaca_ontem = 0;

            if(contrato.RENDIMENTO_ATUAL >= 0)
                valorizaca_ontem = (contrato.RENDIMENTO_ATUAL);
            else{
                valorizaca_ontem = (contrato.RENDIMENTO_ATUAL) - valorizacao_diaria;
            }

            return `${valorizaca_ontem.toFixed(2)}%`;
        }
        return 0;
    }

    const handleLucroDiario = (contrato) => {
        if(contrato){
            var valorizacao_diaria = 0;

            valorizacao_diaria = (contrato.MAXIMUMQUOTAYIELD)/(contrato.MAXIMUMNUMBEROFDAYSTOYIELD * 30);

            return `${valorizacao_diaria.toFixed(2)}%`;
        }
        return 0;
    }

    const handleLucroDiarioDinheiro = (contrato) => {
        if(contrato){
            var valorizacao_diaria = 0;

            valorizacao_diaria = (contrato.MAXIMUMQUOTAYIELD)/(contrato.MAXIMUMNUMBEROFDAYSTOYIELD * 30)/100;

            const valorTotalSpent = contrato.TOTALSPENT >= contrato.TOTALSPENTFEE ? contrato.TOTALSPENT : contrato.TOTALSPENTFEE;
            return `R$${(valorizacao_diaria * valorTotalSpent).toFixed(2)}`;
        }
        return 0;
    }


    return (
        <>
            <Style.Tabela>
                <Style.TabelaHead>
                    <Style.TabelaRow>
                        <Style.TabelaHeader>Cód.</Style.TabelaHeader>
                        <Style.TabelaHeader>1ª VALORIZAÇÃO</Style.TabelaHeader>
                        <Style.TabelaHeader>ÚLTIMA VALORIZAÇÃO</Style.TabelaHeader>
                        <Style.TabelaHeader>LUCRO TOTAL ONTÉM</Style.TabelaHeader>
                        <Style.TabelaHeader>VALORIZAÇÃO DIÁRIA (%)</Style.TabelaHeader>
                        <Style.TabelaHeader>VALORIZAÇÃO DIÁRIA (R$)</Style.TabelaHeader>
                        <Style.TabelaHeader>LUCRO TOTAL HOJE</Style.TabelaHeader>

                    </Style.TabelaRow>
                </Style.TabelaHead>
                <Style.TabelaBody>
                    {contratos.length === 0 ? (
                        <Style.TabelaRow>
                            <Style.TabelaData colSpan="9">Ainda não há contratos.</Style.TabelaData>
                        </Style.TabelaRow>
                    ) : (
                        contratos.map((dado, index) => (
                            <Style.TabelaRow
                                key={index}
                                onClick={() => { handleSelecionar(dado) }}
                                style={{
                                    backgroundColor: selecionada === dado ? 'darkblue' : '',
                                    color: selecionada === dado ? 'white' : 'inherit'
                                }}
                            >
                                <Style.TabelaData>{dado.IDCOMPRA}</Style.TabelaData>
                                <Style.TabelaData>{dado.PRIMEIRA_VALORIZACAO ? formatDateSystem(dado.PRIMEIRA_VALORIZACAO) : formatDateSystem(dado.PRIMEIRO_RENDIMENTO)}</Style.TabelaData>
                                <Style.TabelaData>{getDateBasedOnTime(dado.STATUS)}</Style.TabelaData>
                                <Style.TabelaData>{handleLucroTotalOntem(dado)}</Style.TabelaData>
                                <Style.TabelaData>{handleLucroDiario(dado)}</Style.TabelaData>
                                <Style.TabelaData>{handleLucroDiarioDinheiro(dado)}</Style.TabelaData>
                                <Style.TabelaData>{(dado.RENDIMENTO_ATUAL || 0).toFixed(2)}%</Style.TabelaData>

                            </Style.TabelaRow>
                        ))
                    )}
                </Style.TabelaBody>
            </Style.Tabela>

            {modalData && (
                <PDFGenerator ref={pdfRef} modalData={modalData} />
            )}
        </>
    );
}

export default TabelaValorizacao;
