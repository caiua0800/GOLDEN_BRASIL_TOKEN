import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as T from './ExtratoValorizacaoStyle';
import { formatDateSystem, formatNumber } from "../../assets/utils";
import SideBarBox from "../Sidebar/SideBarBox";
import axios from "axios";

// Função para formatar a data
const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível';
    const [year, month, day, hour, minute] = dateString.split(/[- :]/);
    return `${day}/${month}/${year} ${hour}:${minute}`;
};

const base = process.env.REACT_APP_BASE_ROUTE;
const route = process.env.REACT_APP_OBTER_HISTORICO_RENDIMENTOS;

const ExtratoValorizacao = () => {
    const { userData } = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [message, setMessage] = useState("Carregando...");
    const [pontos, setPontos] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        setMessage("Carregando...");
        setPontos(0);

        // Lógica de intervalo para atualizar "pontos"
        intervalRef.current = setInterval(() => {
            setPontos(prevPontos => {
                // Atualiza a mensagem com base no novo valor de pontos
                if (prevPontos < 3) {
                    if (prevPontos === 0) {
                        setMessage("Carregando.");
                    } else if (prevPontos === 1) {
                        setMessage("Carregando..");
                    } else if (prevPontos === 2) {
                        setMessage("Carregando...");
                    }
                }
                return (prevPontos + 1) % 5; // Reseta para 0 após 4
            });
        }, 200);

        // Chamada à API
        axios.post(`${base}${route}`, { cpf_cliente: userData.CPF })
            .then(res => {
                // Ordenar os dados pelo datacriacao do mais recente para o mais antigo
                const sortedData = res.data.sort((a, b) => new Date(b.datacriacao) - new Date(a.datacriacao));
                setHistory(sortedData);
                setMessage("Dados carregados");
            })
            .catch(error => {
                console.log(`Erro ao obter histórico de rendimentos: ${error.message}`);
                setHistory([]);
                setMessage("Histórico Indisponível");
            })
            .finally(() => {
                clearInterval(intervalRef.current); // Limpa o intervalo no final
            });

        return () => clearInterval(intervalRef.current); // Cleanup do intervalo
    }, [userData.CPF]); // Mantém apenas userData.CPF como dependência

    // Lógica para calcular os índices da página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(history.length / itemsPerPage);

    const handleReturnValor = (id, per) => {
        if (userData.CONTRATOS) {
            for (const ctr of userData.CONTRATOS) {
                if (parseFloat(ctr.IDCOMPRA) === parseFloat(id)) {
                    const retorno = (parseFloat(ctr.TOTALSPENT) * (parseFloat(per) / 100));
                    return retorno;
                }
            }
        }
        return 0; 
    }

    return (
        <SideBarBox>
            <T.ExtratoValorizacaoContainer>
                <T.LoginBehind src='logo-golden.png' />

                <T.PrincipalContent>
                    <T.ContainerTitle>Histórico de Valorização</T.ContainerTitle>

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
                                {currentItems.length > 0 ? (
                                    currentItems.map((transaction, index) => (
                                        <tr key={index}>
                                            <td>{formatDate(transaction.datacriacao) || 'Data não disponível'}</td>
                                            <td>{`Valorização de + ${parseFloat(transaction.percentual || transaction.rendimento).toFixed(3)}% para contrato ${transaction.id_contrato}`}</td>
                                            <td>{`R$${handleReturnValor(transaction.id_contrato, transaction.percentual || transaction.rendimento).toFixed(2)}`}</td>
                                            <td>{'Adicionado'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">{message}</td>
                                    </tr>
                                )}
                            </tbody>
                        </T.Table>
                    </T.TabelaContainer>

                    {/* Controles de Paginação */}
                    <T.Pagination>
                        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                            Anterior
                        </button>
                        <span>{`Página ${currentPage} de ${totalPages}`}</span>
                        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                            Próximo
                        </button>
                    </T.Pagination>
                </T.PrincipalContent>
            </T.ExtratoValorizacaoContainer>
        </SideBarBox>
    );
};

export default ExtratoValorizacao;
