import React, { useContext, useState, useEffect } from 'react';
import { formatarMoedaDollar, formatNumber, consultarALLOWSELL, calcularLucroAcumulado } from '../../assets/utils';
import * as Style from './TabelaContratosStyle';
import { formatDateSystem } from '../../assets/utils';
import { AuthContext } from '../../context/AuthContext';
import { preventCurrentIncome, retornaResposta } from '../../assets/utils';

const TabelaDeContratos = () => {
    const [contratos, setContratos] = useState([]);
    const { userData } = useContext(AuthContext);

    useEffect(() => {
        if (userData && Array.isArray(userData.CONTRATOS)) {
            setContratos(userData.CONTRATOS);
        } else {
            setContratos([]);
        }
    }, [userData]);

    return (
        <Style.Tabela>
            <Style.TabelaHead>
                <Style.TabelaRow>
                    <Style.TabelaHeader>Cód.</Style.TabelaHeader>
                    <Style.TabelaHeader>DATA DA COMPRA</Style.TabelaHeader>
                    <Style.TabelaHeader>DATA DE RECOMPRA</Style.TabelaHeader>
                    <Style.TabelaHeader>CONTRATOS</Style.TabelaHeader>
                    <Style.TabelaHeader>VALOR</Style.TabelaHeader>
                    <Style.TabelaHeader>LUCRO OBTIDO</Style.TabelaHeader>
                    <Style.TabelaHeader>LUCRO TOTAL CONTRATO</Style.TabelaHeader>
                    <Style.TabelaHeader>VALOR TOTAL ATUAL</Style.TabelaHeader>
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
                        <Style.TabelaRow key={index}>
                            <Style.TabelaData>{dado.IDCOMPRA}</Style.TabelaData>
                            <Style.TabelaData>{formatDateSystem(dado.PURCHASEDATE)}</Style.TabelaData>
                            <Style.TabelaData>{formatDateSystem(dado.YIELDTERM)}</Style.TabelaData>
                            <Style.TabelaData>{formatNumber(dado.COINS)}</Style.TabelaData>
                            <Style.TabelaData>{formatarMoedaDollar(dado.TOTALSPENT)}</Style.TabelaData>
                            <Style.TabelaData>
                                U$ {(dado.TOTALSPENT * (dado.RENDIMENTO_ATUAL / 100)).toFixed(2)} ({dado.RENDIMENTO_ATUAL.toFixed(2)}%)
                            </Style.TabelaData>
                            <Style.TabelaData>{dado.MAXIMUMQUOTAYIELD}%</Style.TabelaData>
                            <Style.TabelaData>
                                U$ {(parseFloat(dado.TOTALSPENT) + (dado.TOTALSPENT * (dado.RENDIMENTO_ATUAL / 100))).toFixed(2)}
                            </Style.TabelaData>
                            <Style.TabelaData>{retornaResposta(dado)}</Style.TabelaData>
                        </Style.TabelaRow>
                    ))
                )}
            </Style.TabelaBody>
        </Style.Tabela>
    );
}

export default TabelaDeContratos;
