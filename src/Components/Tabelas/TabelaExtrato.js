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

const TabelaExtrato = ({ startDate, endDate }) => {
    const { userData } = useContext(AuthContext);

    const contratos = userData?.CONTRATOS || [];
    const saques = userData?.SAQUES || [];
    const indicacoes = userData?.INDICACAO || [];

    const transactions = [
        ...contratos.map(c => ({
            date: formatDateSystem(c.PURCHASEDATE) || '',
            description: `Compra de ${c.COINS || 'N/A'} contratos`,
            value: c.TOTALSPENT || 0,
            status: retornaResposta(c),
            type: 'contrato'
        })),
        ...saques.map(s => ({
            date: formatDateSystem(s.DATASOLICITACAO) || '',
            description: `Saque de ${s.VALORSOLICITADO || 'N/A'}`,
            value: s.VALORSOLICITADO || 0,
            status: s.STATUS,
            type: 'saque'
        })),
        ...indicacoes.map(i => ({
            date: formatDateSystem(i.DATACRIACAO) || '',
            description: `Indicação ID ${i.ID_EXTRACT || 'N/A'}: ${i.DESCRIPTION || 'Sem descrição'}`,
            value: i.VALUE || 0,
            type: 'indicacao'
        }))
    ];

    // Remova transações com dados inválidos e fora do intervalo de datas
    const validTransactions = transactions.filter(t => {
        const date = parseDate(t.date);
        return date >= new Date(startDate) && date <= new Date(endDate) && t.value >= 0;
    });

    // Ordene as transações por data do mais recente para o mais antigo
    validTransactions.sort((a, b) => parseDate(b.date) - parseDate(a.date));

    const getTransactionColor = (type) => {
        switch (type) {
            case 'contrato':
                return '#004d00'; // verde escuro para contrato
            case 'saque':
                return '#660000'; // vermelho escuro para saque
            case 'indicacao':
                return '#003300'; // verde escuro para indicação
            default:
                return '#000';
        }
    };

    const getSign = (type) => {
        switch (type) {
            case 'contrato':
                return '+';
            case 'saque':
                return '-';
            case 'indicacao':
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
                        <th>Valor (U$)</th>
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
