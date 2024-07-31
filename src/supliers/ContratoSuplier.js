// src/utils/ContratoSupplier.js
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { isDateAfterToday, parseDateBrazilianFormat } from '../assets/utils';

/**
 * Função para obter contratos do contexto de usuário.
 * @returns {Array} - Array de contratos.
 */
export function useContratosFormatados() {
    const { userData } = useContext(UserContext);


    if (userData && Array.isArray(userData.CONTRATOS)) {
        return userData.CONTRATOS;
    } else {
        console.error('Dados do usuário ou campo CONTRATOS não encontrados.');
        return [];
    }
}



/**
 * Função para calcular o saldo disponível para saque.
 * @returns {Number} - Saldo disponível para saque.
 */

export function useSaldoPlataforma() {
    const { userData } = useContext(UserContext);
    const [saldoIndicacao, setSaldoIndicacao] = useState(0);
    const [tokensObtidos, setTokensObtidos] = useState(0);
    const [saldoTotal, setSaldoTotal] = useState(0);
    const [lucroTotal, setLucroTotal] = useState(0);
    const [saldoContratosVencidos, setSaldoContratosVencidos] = useState(0);
    const [valorInvestido, setValorInvestido] = useState(0);
    const [saldoDeRecompra, setSaldoDeRecompra] = useState(0);
    const [contratosAtivos, setContratosAtivos] = useState([]);
    const [saldoOperacoes, setSaldoOperacoes] = useState(0);
    const [disponivelSaque, setDisponivelSaque] = useState(0);

    useEffect(() => {
        if (userData && userData.CONTRATOS) {
            const today = new Date();
            let totalInvestido = 0;
            let tokensObtidos = 0;
            let saldoTotal = 0;
            let lucroTotal = 0;
            let saldoContratosVencidos = 0;
            let saldoDeOperacoes = 0;
            let disponivelParaSaque = 0;

            const saquesFeitos = userData.VALORSACADO || 0; // Adapte conforme necessário

            setSaldoIndicacao(userData.INDICATIONBUDGET);

            const contratosAtivos = userData.CONTRATOS.filter(contr => {
                if (contr.STATUS) {
                    const allowSellDate = parseDateBrazilianFormat(contr.ALLOWSELL);
                    return allowSellDate.toISOString() >= today.toISOString();
                }
                return false;
            });

            setContratosAtivos(contratosAtivos);

            contratosAtivos.forEach(contr => {
                tokensObtidos += contr.COINS;
                
            });

            userData.CONTRATOS.forEach(contr => {
                if (contr.STATUS) {
                    const allowSellDate = parseDateBrazilianFormat(contr.ALLOWSELL);
                    if (allowSellDate.toISOString() < today.toISOString()) {
                        saldoContratosVencidos += contr.TOTALSPENT;
                    }
                }
                lucroTotal += parseFloat(contr.TOTALSPENT * (contr.LUCRO_OBTIDO / 100));
                totalInvestido += contr.TOTALSPENT;
            });

            const saldoDeRecompra = lucroTotal + saldoContratosVencidos + saldoIndicacao - saquesFeitos;
            
            setTokensObtidos(tokensObtidos);
            setSaldoTotal(lucroTotal + totalInvestido + saldoIndicacao  + saldoContratosVencidos - saquesFeitos);
            setSaldoOperacoes(lucroTotal + totalInvestido + saldoContratosVencidos - saquesFeitos);
            setDisponivelSaque(lucroTotal + saldoContratosVencidos + saldoIndicacao - saquesFeitos)
            setLucroTotal(lucroTotal);
            setSaldoContratosVencidos(saldoContratosVencidos);
            setValorInvestido(totalInvestido - saquesFeitos);
            setSaldoDeRecompra(saldoDeRecompra);
        }
    }, [userData]);

    return {
        saldoIndicacao,
        tokensObtidos,
        saldoTotal,
        lucroTotal,
        saldoContratosVencidos,
        valorInvestido,
        saldoDeRecompra,
        contratosAtivos,
        saldoOperacoes,
        disponivelSaque,
    };
}
