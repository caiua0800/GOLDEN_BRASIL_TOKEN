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

const TabelaExtrato = ({ startDate, endDate, filter }) => {
    const { userData } = useContext(AuthContext);

    const contratos = userData?.CONTRATOS || [];
    const saques = userData?.SAQUES || [];
    const indicacoes = userData?.INDICACAO || [];
    const plusData = userData?.PLUS || []; // Dados do array PLUS

    const transactions = [
        // Filtra e mapeia os contratos com status diferente de 4
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
            date: formatDateSystem(i.TIMESTAMP) || '',
            description: `Indicação Cliente ${i.NAME || 'N/A'}: R$${formatNumber(i.VALOR*10) || 'Sem descrição'}`,
            value: (i.VALOR) || 0,
            status: 'ADICIONADO',
            type: 'indicacao'
        })),

        // Mapeia os dados do array PLUS
        ...plusData.map(p => ({
            date: formatDateSystem(p.date_created) || '',
            description: `PLUS DE R$${p.value_multiplied} PARA CONTRATO ${p.IDCOMPRA}`,
            value: p.value_multiplied || 0,
            status: 'ADICIONADO',
            type: 'plus' // Novo tipo para as transações do PLUS
        })),

        // Se o filtro for "Valorização", adicione as valorizacões de cada contrato
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
    
    // Remova transações com dados inválidos e fora do intervalo de datas
    const validTransactions = transactions.filter(t => {
        const date = parseDate(t.date);
        return date >= parseDate(startDate) && date <= parseDate(endDate) && t.value >= 0;
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
            case 'valorizacao':
                return '+'; 
            case 'plus':
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
