import React, { useContext, useState, useEffect, useRef } from 'react';
import * as Style from './TabelaContratosStyle';
import { formatDateSystem } from '../../assets/utils';
import { AuthContext } from '../../context/AuthContext';
import { retornaResposta } from '../../assets/utils';
import PDFGenerator from './PDF';

const linkContaDeposito = '/ContaDeDeposito';

const TabelaDeContratos = () => {
    const [contratos, setContratos] = useState([]);
    const { userData } = useContext(AuthContext);
    const [modalData, setModalData] = useState(null);
    const [selecionada, setSelecionada] = useState(null)
    const pdfRef = useRef();


    const handlePutaria = (normal, comTaxa) => {
        if(parseFloat(comTaxa) > parseFloat(normal))
            return parseFloat(comTaxa)
        return parseFloat(normal);
    }

    useEffect(() => {
        if (userData && Array.isArray(userData.CONTRATOS)) {
            setContratos(userData.CONTRATOS);
            const sortedContratos = [...userData.CONTRATOS].sort((a, b) => a.IDCOMPRA - b.IDCOMPRA);
            setContratos(sortedContratos);
        } else {
            setContratos([]);
        }
    }, [userData]);

    const handleOpenLink = (link) => {
        window.open(link, '_blank');
    }

    const handleReturnStatusForTicket = (s) => {
        return (s === 1 || s === 2 || s === 3) ? false : true;
    }

    const handlePDFGenerator = (data) => {
        const newModalData = {
            dias: 1095,
            lucroDiario: parseFloat(data.MAXIMUMQUOTAYIELD) / 1095,
            porcentagemLucro: data.MAXIMUMQUOTAYIELD,
            qttContratos: data.COINS,
            valorPorContrato: data.COINVALUE,
            lucroTotal: data.TOTALSPENT,
        };

        setModalData(newModalData);


    };

    const returnValorDisponivel = (contrato) => {
        if (!contrato || contrato.length === 0)
            return 0;

        let valorSacado = 0;

        if (contrato.SAQUES_FEITOS) {
            contrato.SAQUES_FEITOS.forEach(s => {
                if (s.STATUS === 1 || s.STATUS === 2) {
                    valorSacado += parseFloat(s.VALORSOLICITADO);
                }
            })
        }

        console.log(valorSacado)
        let valorLucro = (contrato.RENDIMENTO_ATUAL / 100) * parseFloat(contrato.TOTALSPENT);

        if (valorLucro && valorSacado)
            return valorLucro - valorSacado
        else {
            return valorLucro ? valorLucro : 0;
        }
    }

    useEffect(() => {
        if (modalData !== null) {
            pdfRef.current.downloadPDF();
        }
    }, [modalData]);

    const handleSelecionar = (c) => {
        if (selecionada === c)
            setSelecionada(null);
        else
            setSelecionada(c);
    }

    return (
        <>
            <Style.Tabela>
                <Style.TabelaHead>
                    <Style.TabelaRow>
                        <Style.TabelaHeader>Cód.</Style.TabelaHeader>
                        <Style.TabelaHeader>DATA DA COMPRA</Style.TabelaHeader>
                        <Style.TabelaHeader>DATA DE RECOMPRA</Style.TabelaHeader>
                        <Style.TabelaHeader>DATA 1º REND.</Style.TabelaHeader>
                        <Style.TabelaHeader>CONTRATOS</Style.TabelaHeader>
                        <Style.TabelaHeader>VALOR</Style.TabelaHeader>
                        {/* <Style.TabelaHeader>LUCRO ONTÉM</Style.TabelaHeader> */}
                        <Style.TabelaHeader>LUCRO HOJE</Style.TabelaHeader>
                        <Style.TabelaHeader>DISP. SAQUE</Style.TabelaHeader>
                        <Style.TabelaHeader>TOTAL GANHO</Style.TabelaHeader>
                        <Style.TabelaHeader>LUCRO TOTAL FINAL</Style.TabelaHeader>
                        <Style.TabelaHeader>CONTRATO</Style.TabelaHeader>
                        <Style.TabelaHeader>TICKET</Style.TabelaHeader>
                        <Style.TabelaHeader>STATUS</Style.TabelaHeader>
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
                                <Style.TabelaData>{formatDateSystem(dado.PURCHASEDATE)}</Style.TabelaData>
                                <Style.TabelaData>{formatDateSystem(dado.YIELDTERM)}</Style.TabelaData>
                                <Style.TabelaData>{dado.PRIMEIRO_RENDIMENTO ? dado.PRIMEIRO_RENDIMENTO : "Não encontrado"}</Style.TabelaData>
                                <Style.TabelaData>{dado.COINS}</Style.TabelaData>


                                <Style.TabelaData>R$ {parseFloat(dado.TOTALSPENT).toFixed(2) ? handlePutaria(dado.TOTALSPENT, dado.TOTALSPENTFEE).toFixed(2) : handlePutaria(dado.TOTALSPENT, dado.TOTALSPENTFEE)}</Style.TabelaData>
                   

                                <Style.TabelaData>
                                    {dado.RENDIMENTO_ATUAL ? dado.RENDIMENTO_ATUAL.toFixed(2) : dado.RENDIMENTO_ATUAL}%
                                </Style.TabelaData>
                                <Style.TabelaData className='valorSaqueDisp'>
                                    R${(returnValorDisponivel(dado) < 0 && returnValorDisponivel(dado) > -1 ? 0.00 : returnValorDisponivel(dado).toFixed(2))}
                                </Style.TabelaData>
                                <Style.TabelaData>
                                    R${dado.RENDIMENTO_ATUAL ? ((dado.RENDIMENTO_ATUAL / 100) * parseFloat(dado.TOTALSPENT)).toFixed(2) : 0}
                                </Style.TabelaData>
                                <Style.TabelaData>{(parseFloat(dado.MAXIMUMQUOTAYIELD)).toFixed(2)}%</Style.TabelaData>
                                <Style.TabelaData>
                                    <button onClick={() => handlePDFGenerator(dado)}>BAIXAR</button>
                                </Style.TabelaData>
                                <Style.TabelaData>
                                    {handleReturnStatusForTicket(dado.STATUS) ? (
                                        dado.TICKET ? (
                                            <span onClick={() => handleOpenLink(dado.TICKET)}>PAGAR</span>
                                        ) : (
                                            <span onClick={() => handleOpenLink(linkContaDeposito)}>VER CONTA</span>
                                        )
                                    ) : 'PAGO'}
                                </Style.TabelaData>
                                <Style.TabelaData>{retornaResposta(dado)}</Style.TabelaData>
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

export default TabelaDeContratos;
