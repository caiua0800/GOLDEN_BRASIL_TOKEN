import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as T from './TabelaExtratoStyle';
import { formatDateSystem, formatNumber } from "../../assets/utils";

// Função para converter data 'dd/mm/aaaa' para o formato Date
const parseDate = (dateString) => {
    if (!dateString) return new Date(0); 
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
};

const TabelaExtrato = ({ startDate, endDate }) => {
    const { userData } = useContext(AuthContext);

    // Obtenha os dados de contratos, saques e indicações
    const contratos = userData?.CONTRATOS || [];
    const saques = userData?.SAQUES || [];
    const indicacoes = userData?.INDICACAO || [];

    // Combine contratos, saques e indicações em uma única lista
    const transactions = [
        ...contratos.map(c => ({
            date: formatDateSystem(c.PURCHASEDATE) || '',
            description: `Compra de ${c.COINS || 'N/A'} contratos`,
            value: c.TOTALSPENT || 0
        })),
        ...saques.map(s => ({
            date: formatDateSystem(s.DATAREQUERIMENTO) || '',
            description: `Saque de ${s.VALORREQUERIDO || 'N/A'}`,
            value: s.VALORREQUERIDO || 0
        })),
        ...indicacoes.map(i => ({
            date: formatDateSystem(i.DATACRIACAO) || '',
            description: `Indicação ID ${i.ID_EXTRACT || 'N/A'}: ${i.DESCRIPTION || 'Sem descrição'}`,
            value: i.VALUE || 0
        }))
    ];

    // Remova transações com dados inválidos e fora do intervalo de datas
    const validTransactions = transactions.filter(t => {
        const date = parseDate(t.date);
        return date >= new Date(startDate) && date <= new Date(endDate) && t.value >= 0;
    });

    // Ordene as transações por data do mais recente para o mais antigo
    validTransactions.sort((a, b) => parseDate(b.date) - parseDate(a.date));

    return (
        <T.TabelaContainer>
            <T.Table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Valor (U$)</th>
                    </tr>
                </thead>
                <tbody>
                    {validTransactions.length ? (
                        validTransactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.date || 'Data não disponível'}</td>
                                <td>{transaction.description || 'Descrição não disponível'}</td>
                                <td>{transaction.value !== undefined ? formatNumber(transaction.value) : 'Valor inválido'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Nenhuma transação disponível</td>
                        </tr>
                    )}
                </tbody>
            </T.Table>
        </T.TabelaContainer>
    );
};

export default TabelaExtrato;
