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
    const [rendimentosFaltantes, setRendimentosFaltantes] = useState([])
    const intervalRef = useRef(null);
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);


    function calcularDiasAteHoje(ultima_data, arrayObjetos) {
        // Converte a última data de string para um objeto Date
        const ultimaDataObject = new Date(ultima_data);

        // Obtém a data de hoje
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0); // Zera horas, minutos e segundos para comparação

        if (ultimaDataObject < hoje) {
            const diferencaEmMs = hoje - ultimaDataObject;
            const quantidadeDias = Math.floor(diferencaEmMs / (1000 * 60 * 60 * 24)); // Converte de ms para dias

            // Retorna o novo array filtrado e com o campo adicional
            return arrayObjetos
                .map(obj => ({
                    ...obj,
                    quantidadeAteHoje: quantidadeDias,
                    diario: parseFloat(obj.MAXIMUMQUOTAYIELD) / (parseFloat(obj.MAXIMUMNUMBEROFDAYSTOYIELD) * parseFloat(30)),
                }))
                .filter(obj => obj.STATUS === 1 || obj.STATUS === 2); // Filtra apenas os objetos com STATUS 1 ou 2
        }

        // Caso a última data não seja anterior ao dia de hoje, retorne o array original
        return arrayObjetos.filter(obj => obj.STATUS === 1 || obj.STATUS === 2); // Filtra os objetos com STATUS 1 ou 2
    }


    useEffect(() => {
        setMessage("Carregando...");
        setPontos(0);

        // Lógica de intervalo para atualizar "pontos"
        intervalRef.current = setInterval(() => {
            setPontos(prevPontos => {
                if (prevPontos < 3) {
                    if (prevPontos === 0) {
                        setMessage("Carregando.");
                    } else if (prevPontos === 1) {
                        setMessage("Carregando..");
                    } else if (prevPontos === 2) {
                        setMessage("Carregando...");
                    }
                }
                return (prevPontos + 1) % 5;
            });
        }, 200);

        // Chamada à API
        axios.post(`${base}${route}`, { cpf_cliente: userData.CPF })
            .then(res => {
                console.log(res.data[0])
                const sortedData = res.data.sort((a, b) => new Date(b.datacriacao) - new Date(a.datacriacao));
                setHistory(sortedData);
                setMessage("Dados carregados");

                if (sortedData.length > 0 && sortedData[0].datacriacao) {
                    const rendimentosFaltantes = calcularDiasAteHoje(sortedData[0].datacriacao, userData.CONTRATOS);
                    setRendimentosFaltantes(rendimentosFaltantes);
                }

                setIsInitialDataLoaded(true);
            })
            .catch(error => {
                console.log(`Erro ao obter histórico de rendimentos: ${error.message}`);
                setHistory([]);
                setMessage("Histórico Indisponível");
                setIsInitialDataLoaded(true);

                if (userData.CONTRATOS) {
                    let ctr = null;
                    for (let i = 0; i < userData.CONTRATOS.length; i++) {
                        if (userData.CONTRATOS[i].STATUS === 1) {
                            ctr = userData.CONTRATOS[i];
                            break;
                        }
                    }
                    if (ctr) {
                        console.log(ctr);
                        const rendimentosFaltantes = calcularDiasAteHoje(ctr.PRIMEIRO_RENDIMENTO ? ctr.PRIMEIRO_RENDIMENTO : ctr.PURCHASEDATE, userData.CONTRATOS);
                        setRendimentosFaltantes(rendimentosFaltantes);
                        setIsInitialDataLoaded(true);

                    }
                }
            })
            .finally(() => {
                clearInterval(intervalRef.current);
            });

        return () => clearInterval(intervalRef.current);
    }, [userData.CPF]);

    useEffect(() => {
        if (isInitialDataLoaded && rendimentosFaltantes.length > 0) {
            addRendimentosAteHoje(rendimentosFaltantes);
        }
    }, [isInitialDataLoaded, rendimentosFaltantes]);

    const addRendimentosAteHoje = (rendimentosFaltantes) => {
        const today = new Date(); // Data de hoje

        rendimentosFaltantes.forEach(rendimento => {
            if (rendimento.quantidadeAteHoje > 0) {  // Se a quantidade é maior que 0
                const quantidadeAteHoje = rendimento.quantidadeAteHoje + 1;
                const id_contrato = rendimento.IDCOMPRA;

                let ctr = null;
                if (userData.CONTRATOS) {
                    for (let i = 0; i < userData.CONTRATOS.length; i++) {
                        if (userData.CONTRATOS[i].STATUS === 1) {
                            ctr = userData.CONTRATOS[i];
                            break;
                        }
                    }
                }

                // Usar a última data de criação para começar a contar
                const ultimaData = new Date(history[0] ? history[0].datacriacao : (ctr.PRIMEIRO_RENDIMENTO ? ctr.PRIMEIRO_RENDIMENTO : ctr.PURCHASEDATE));

                // Adicione rendimentos até a quantidade de dias
                for (let i = 1; i <= (quantidadeAteHoje); i++) {
                    const novaData = new Date(ultimaData); // Cria uma nova instância da última data
                    novaData.setDate(ultimaData.getDate() + i); // Adiciona 'i' dias à última data

                    if (novaData <= today) { // Somente adicione se a nova data for hoje ou antes
                        const novoRendimento = {
                            id_contrato: id_contrato,
                            percentual: rendimento.diario, // Use o rendimento necessário
                            datacriacao: novaData.toISOString().slice(0, 19).replace('T', ' '), // Data formatada
                        };

                        // Adiciona o novo rendimento ao histórico
                        setHistory(prevHistory => {
                            // Adiciona o novo rendimento ao histórico existente
                            const updatedHistory = [novoRendimento, ...prevHistory];

                            // Ordena o histórico atualizado pela data de criação (do mais recente para o mais antigo)
                            const sortedHistory = updatedHistory.sort((a, b) =>
                                new Date(b.datacriacao) - new Date(a.datacriacao)
                            );

                            // Retorna o histórico ordenado
                            return sortedHistory;
                        });
                    }
                }
            }
        });
    };





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
