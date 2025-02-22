import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as T from './TabelaExtratoStyle';
import { formatDateSystem, formatNumber } from "../../assets/utils";
import { retornaResposta } from "../../assets/utils";

const parseDate = (dateString) => {
    if (!dateString) return new Date(0);
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
};

const returnSaquesResponse = (str) => {
    switch (str) {
        case 1:
            return 'PENDENTE';
        case 2:
            return 'PAGO';
        case 3:
            return 'RECUSADO';
        default:
            return 'INDEFINIDO';
    }
}

const isBeforeDate = (dateString, compareDateString) => {
    const date = new Date(dateString);
    const compareDate = new Date(compareDateString);
    return date < compareDate;
};

const TabelaExtrato = ({ startDate, endDate, filter }) => {
    const { userData } = useContext(AuthContext);

    const contratos = userData?.CONTRATOS || [];
    const saques = userData?.SAQUES || [];
    const indicacoes = userData?.INDICACAO || [];
    const saque_indicacao = userData?.SAQUES_INDICACAO || [];
    const plusData = userData?.PLUS || []; // Dados do array PLUS
    const antecipacoes = userData?.ANTECIPACOES || []; // Dados do array PLUS

    const transactions = [

        ...antecipacoes.map(p => {
            return {
                date: formatDateSystem(p.DATACRIACAO) || '',
                description: p.description,
                value: p.value || 0,
                status: 'ADICIONADO',
                type: 'antecipacao'
            };
        }),
        
        ...contratos
            .filter(c => c.STATUS !== 4)
            .map(c => ({
                date: formatDateSystem(c.PURCHASEDATE) || '',
                description: `Compra de ${c.COINS || 'N/A'} contratos`,
                value: c.TOTALSPENT || 0,
                status: retornaResposta(c),
                type: 'contrato'
            })),

        // Filtra e mapeia os saques com status igual a 2
        ...saques
            .filter(s => s.STATUS === 2)
            .map(s => ({
                date: formatDateSystem(s.DATASOLICITACAO) || '',
                description: `Saque de R$${s.VALORSOLICITADO.toFixed(2) || 'N/A'}`,
                value: `${s.VALORSOLICITADO.toFixed(2)}` || 0,
                status: returnSaquesResponse(s.STATUS),
                type: 'saque'
            })),

        // Mapeia as indicações
        ...indicacoes.map(i => ({
            date: formatDateSystem(i.DATACRIACAO) || '',
            description: `Indicação de R$${(isBeforeDate(i.DATACRIACAO) ? (i.VALUE / 5.34) : (i.VALUE))} de ${i.NAME}`,
            value: (isBeforeDate(i.DATACRIACAO) ? (i.VALUE / 5.34) : (i.VALUE)) || 0,
            status: 'ADICIONADO',
            type: 'indicacao'
        })),

        ...saque_indicacao.map(i => ({
            date: formatDateSystem(i.DATASOLICITACAO) || '',
            description: `${i.description || 'Sem descrição'}`,
            value: (isBeforeDate(i.DATACRIACAO) ? (i.VALOR / 5.34) : (i.VALOR)) || 0,
            status: 'ADICIONADO',
            type: 'indicacao'
        })),

        ...plusData.map(p => {
            return {
                date: formatDateSystem(p.date_created) || '',
                description: `PLUS DE R$${p.value_multiplied} PARA CONTRATO ${p.IDCOMPRA}`,
                value: p.value_multiplied || 0,
                status: 'ADICIONADO',
                type: 'plus'
            };
        }),

        ...(filter === 'Valorizacao' ? contratos.reduce((acc, contrato) => {
            const historicoRendimentos = contrato.HISTORICO_RENDIMENTO || [];
            const newTransactions = historicoRendimentos.map(rendimento => ({
                date: formatDateSystem(rendimento.DATACRIACAO) || '',
                description: `Valorização do contrato ${rendimento.IDCOMPRA}`,
                value: rendimento.PERCENTUAL || 0,
                status: 'Adicionado',
                type: 'valorizacao'
            }));
            return [...acc, ...newTransactions];
        }, []) : [])
    ];

    const validTransactions = transactions.filter(t => {
        const date = parseDate(t.date);
        return date >= parseDate(startDate) && date <= parseDate(endDate) && t.value >= 0;
    });


    validTransactions.sort((a, b) => parseDate(b.date) - parseDate(a.date));


    const getSign = (type) => {
        switch (type) {
            case 'contrato':
                return '+';
            case 'saque':
                return '-';
            case 'indicacao':
                return '+';
            case 'valorizacao':
                return '+';
            case 'plus':
                return '+';
            case 'antecipacao':
                return '+';
            default:
                return '';
        }
    };

    return (
        <T.TabelaContainer>
            <T.Table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Valor (R$)</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {validTransactions.length ? (
                        validTransactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.date || 'Data não disponível'}</td>
                                <td>{transaction.description || 'Descrição não disponível'}</td>
                                <td className={`value-cell ${transaction.type}`}>
                                    {transaction.value !== undefined ? `${getSign(transaction.type)} ${formatNumber(transaction.value)}` : 'Valor inválido'}
                                </td>
                                <td>{transaction.status || 'Status não disponível'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Nenhuma transação disponível</td>
                        </tr>
                    )}
                </tbody>
            </T.Table>
        </T.TabelaContainer>
    );
};

export default TabelaExtrato;
