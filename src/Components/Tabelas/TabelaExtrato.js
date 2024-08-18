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

    console.log(indicacoes)

    const transactions = [
        // Filtra e mapeia os contratos com status diferente de 4
        ...contratos
            .filter(c => c.STATUS !== 4) // Filtra contratos com status diferente de 4
            .map(c => ({
                date: formatDateSystem(c.PURCHASEDATE) || '',
                description: `Compra de ${c.COINS || 'N/A'} contratos`,
                value: c.TOTALSPENT || 0,
                status: retornaResposta(c),
                type: 'contrato'
            })),
    
        // Filtra e mapeia os saques com status igual a 2
        ...saques
            .filter(s => s.STATUS === 2) // Filtra saques com status igual a 2
            .map(s => ({
                date: formatDateSystem(s.DATASOLICITACAO) || '',
                description: `Saque de ${s.VALORSOLICITADO || 'N/A'}`,
                value: s.VALORSOLICITADO || 0,
                status: s.STATUS,
                type: 'saque'
            })),
    
        // Mapeia as indicações sem filtrar
        ...indicacoes.map(i => ({
            date: formatDateSystem(i.TIMESTAMP) || '',
            description: `Indicação Cliente ${i.NAME || 'N/A'}: U$${formatNumber(i.VALOR*10) || 'Sem descrição'}`,
            value: (i.VALOR) || 0,
            status: 'ADICIONADO',
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
