// import React, { useContext, useEffect, useState, useRef } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import * as T from './ExtratoValorizacaoStyle';
// import { formatDateSystem, formatNumber } from "../../assets/utils";
// import SideBarBox from "../Sidebar/SideBarBox";
// import axios from "axios";

// // Função para formatar a data
// const formatDate = (dateString) => {
//     if (!dateString) return 'Data não disponível';
//     const [year, month, day, hour, minute] = dateString.split(/[- :]/);
//     return `${day}/${month}/${year} ${hour}:${minute}`;
// };

// const base = process.env.REACT_APP_BASE_ROUTE;
// const route = process.env.REACT_APP_OBTER_HISTORICO_RENDIMENTOS;

// const ExtratoValorizacao = () => {
//     const { userData } = useContext(AuthContext);
//     const [history, setHistory] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(10);
//     const [message, setMessage] = useState("Carregando...");
//     const [pontos, setPontos] = useState(0);
//     const [rendimentosFaltantes, setRendimentosFaltantes] = useState([]);
//     const [filterId, setFilterId] = useState(""); // Estado do filtro
//     const intervalRef = useRef(null);
//     const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);


//     const getClosestDate = (history) => {
//         const today = new Date('2024-10-15'); // Substitua por `new Date()` para pegar a data atual
//         let closestDate = null;

//         history.forEach(transaction => {
//             const transactionDate = new Date(transaction.datacriacao);
//             if (transactionDate <= today) {
//                 if (!closestDate || transactionDate > closestDate) {
//                     closestDate = transactionDate;
//                 }
//             }
//         });

//         return closestDate ? closestDate.toISOString().slice(0, 10) : 'Nenhuma data disponível';
//     };

//     function calcularDiasAteHoje(ultima_data, arrayObjetos) {
//         const ultimaDataObject = new Date(ultima_data);
//         const hoje = new Date();
//         hoje.setHours(0, 0, 0, 0);

//         if (ultimaDataObject < hoje) {
//             const diferencaEmMs = hoje - ultimaDataObject;
//             const quantidadeDias = Math.floor(diferencaEmMs / (1000 * 60 * 60 * 24));

//             return arrayObjetos
//                 .map(obj => ({
//                     ...obj,
//                     quantidadeAteHoje: quantidadeDias,
//                     diario: parseFloat(obj.MAXIMUMQUOTAYIELD) / (parseFloat(obj.MAXIMUMNUMBEROFDAYSTOYIELD) * parseFloat(30)),
//                 }))
//                 .filter(obj => obj.STATUS === 1 || obj.STATUS === 2);
//         }

//         return arrayObjetos.filter(obj => obj.STATUS === 1 || obj.STATUS === 2);
//     }

//     useEffect(() => {
//         setMessage("Carregando...");
//         setPontos(0);

//         intervalRef.current = setInterval(() => {
//             setPontos(prevPontos => {
//                 if (prevPontos < 3) {
//                     if (prevPontos === 0) {
//                         setMessage("Carregando.");
//                     } else if (prevPontos === 1) {
//                         setMessage("Carregando..");
//                     } else if (prevPontos === 2) {
//                         setMessage("Carregando...");
//                     }
//                 }
//                 return (prevPontos + 1) % 5;
//             });
//         }, 200);

//         axios.post(`${base}${route}`, { cpf_cliente: userData.CPF })
//             .then(res => {
//                 const sortedData = res.data.sort((a, b) => new Date(b.datacriacao) - new Date(a.datacriacao));
//                 setHistory(sortedData);
//                 setMessage("Dados carregados");

//                 if (sortedData.length > 0 && sortedData[0].datacriacao) {
//                     const rendimentosFaltantes = calcularDiasAteHoje(sortedData[0].datacriacao, userData.CONTRATOS);
//                     setRendimentosFaltantes(rendimentosFaltantes);
//                 }

//                 const closestDate = getClosestDate(sortedData);
//                 setIsInitialDataLoaded(true);
//             })
//             .catch(error => {
//                 console.log(`Erro ao obter histórico de rendimentos: ${error.message}`);
//                 setHistory([]);
//                 setMessage("Histórico Indisponível");
//                 setIsInitialDataLoaded(true);

//                 if (userData.CONTRATOS) {
//                     let ctr = null;
//                     for (let i = 0; i < userData.CONTRATOS.length; i++) {
//                         if (userData.CONTRATOS[i].STATUS === 1) {
//                             ctr = userData.CONTRATOS[i];
//                             break;
//                         }
//                     }
//                     if (ctr) {
//                         const rendimentosFaltantes = calcularDiasAteHoje(ctr.PRIMEIRO_RENDIMENTO ? ctr.PRIMEIRO_RENDIMENTO : ctr.PURCHASEDATE, userData.CONTRATOS);
//                         setRendimentosFaltantes(rendimentosFaltantes);
//                         setIsInitialDataLoaded(true);
//                     }
//                 }
//             })
//             .finally(() => {
//                 clearInterval(intervalRef.current);
//             });

//         return () => clearInterval(intervalRef.current);
//     }, [userData.CPF]);

//     useEffect(() => {
//         if (isInitialDataLoaded && rendimentosFaltantes.length > 0) {
//             addRendimentosAteHoje(rendimentosFaltantes);
//         }
//     }, [isInitialDataLoaded, rendimentosFaltantes]);

   

//     const addRendimentosAteHoje = (rendimentosFaltantes) => {
//         const today = new Date(); // Obtém a data atual
//         today.setHours(2, 30, 0, 0); // Define o horário para 02:30
    
//         const novasEntradas = []; // Array para armazenar novas entradas a serem adicionadas
    
//         // Percorre cada rendimento faltante
//         rendimentosFaltantes.forEach(rendimento => {
//             if (rendimento.quantidadeAteHoje > 0) {
//                 const id_contrato = rendimento.IDCOMPRA;
    
//                 // Obtendo a última data do histórico
//                 const ultimaData = new Date(history[0] ? history[0].datacriacao : (userData.CONTRATOS[0]?.PRIMEIRO_RENDIMENTO || userData.CONTRATOS[0]?.PURCHASEDATE));
//                 ultimaData.setHours(0, 0, 0, 0); // Reseta a última data para 00:00 para comparação
    
//                 // Mantém a contagem de dias a serem adicionados
//                 const quantidadeAteHoje = Math.floor((today - ultimaData) / (1000 * 60 * 60 * 24)); 
    
//                 // Adiciona novos rendimentos a partir do último dia conhecido até hoje, inclusive
//                 for (let i = 1; i <= quantidadeAteHoje; i++) {
//                     const novaData = new Date(ultimaData);
//                     novaData.setDate(ultimaData.getDate() + i);
//                     novaData.setHours(2, 30, 0, 0); // Define o horário para 02:30
    
//                     // Adiciona se esta data não estiver já no histórico
//                     if (!history.some(item => new Date(item.datacriacao).toDateString() === novaData.toDateString())) {
//                         const novoRendimento = {
//                             id_contrato: id_contrato,
//                             percentual: rendimento.diario,
//                             datacriacao: novaData.toISOString().slice(0, 19).replace('T', ' '),
//                         };
    
//                         novasEntradas.push(novoRendimento);
//                     }
//                 }
//             }
//         });
    
//         // Atualiza o histórico se houver novas entradas
//         if (novasEntradas.length > 0) {
//             setHistory(prevHistory => {
//                 const updatedHistory = [...novasEntradas, ...prevHistory];
//                 return updatedHistory.sort((a, b) => new Date(b.datacriacao) - new Date(a.datacriacao));
//             });
//         }
//     };
    

//     const handleReturnValor = (id, per) => {
//         if (userData.CONTRATOS) {
//             for (const ctr of userData.CONTRATOS) {
//                 if (parseFloat(ctr.IDCOMPRA) === parseFloat(id)) {
//                     const retorno = (parseFloat(ctr.TOTALSPENT) * (parseFloat(per) / 100));
//                     return retorno;
//                 }
//             }
//         }
//         return 0;
//     }

//     const handleFilterChange = (event) => {
//         setFilterId(event.target.value);
//     };

//     const filteredItems = history.filter(item =>
//         item.id_contrato.toString().includes(filterId)
//     );

//     const handleSearchPage = (e) => {
//         if (e.trim() === "" || e === 0 || e === "0") {
//             setCurrentPage(1)
//         } else {
//             setCurrentPage(e)
//         }
//     }

//     // Lógica para paginação
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

//     return (
//         <SideBarBox>
//             <T.ExtratoValorizacaoContainer>
//                 <T.LoginBehind src='logo-golden.png' />

//                 <T.PrincipalContent>
//                     <T.ContainerTitle>Histórico de Valorização</T.ContainerTitle>

//                     <T.SearchBar>
//                         <input
//                             placeholder="Filtre pelo ID do Contrato"
//                             value={filterId}
//                             onChange={handleFilterChange}
//                         />
//                     </T.SearchBar>

//                     <T.TabelaContainer>
//                         <T.Table>
//                             <thead>
//                                 <tr>
//                                     <th>Data</th>
//                                     <th>Descrição</th>
//                                     <th>Valor (R$)</th>
//                                     <th>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {currentItems.length > 0 ? (
//                                     currentItems.map((transaction, index) => (
//                                         <tr key={index}>
//                                             <td>{formatDate(transaction.datacriacao) || 'Data não disponível'}</td>
//                                             <td>{`Valorização de + ${parseFloat(transaction.percentual || transaction.rendimento).toFixed(3)}% para contrato ${transaction.id_contrato}`}</td>
//                                             <td>{`R$${handleReturnValor(transaction.id_contrato, transaction.percentual || transaction.rendimento).toFixed(2)}`}</td>
//                                             <td>{'Adicionado'}</td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="4">{message}</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </T.Table>
//                     </T.TabelaContainer>


//                     <T.Pagination>
//                         <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
//                             Anterior
//                         </button>
//                         <span>{`Página ${currentPage} de ${totalPages}`}</span>
//                         <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
//                             Próximo
//                         </button>
//                         <input onChange={(e) => handleSearchPage(e.target.value)} type="number" placeholder="Página" />
//                     </T.Pagination>
//                 </T.PrincipalContent>
//             </T.ExtratoValorizacaoContainer>
//         </SideBarBox>
//     );
// };

// export default ExtratoValorizacao;





import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as T from './ExtratoValorizacaoStyle';
import SideBarBox from "../Sidebar/SideBarBox";

// Função para formatar a data
const formatDate = (date) => {
    if (!date) return 'Data não disponível';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // mês começa em 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const ExtratoValorizacao = () => {
    const { userData } = useContext(AuthContext);
    const [quantidadeDadosPorContrato, setQuantidadeDadosPorContrato] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [filterId, setFilterId] = useState("");

    function diasDesdeData(dataString, yieldTerm) {
        const dataInformada = new Date(dataString);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        // Converte a yieldTerm para um objeto Date (assumindo que yieldTerm é uma string em um formato aceitável pelo construtor Date)
        const termoRendimento = new Date(yieldTerm);
        termoRendimento.setHours(0, 0, 0, 0);
    
        // Verifica se a data de hoje está depois do yieldTerm
        if (hoje > termoRendimento) {
            // Se hoje é após o yieldTerm, retorna a quantidade de dias entre dataInformada e yieldTerm
            const diffEmMilissegundos = termoRendimento - dataInformada;
            return Math.floor(diffEmMilissegundos / (1000 * 60 * 60 * 24));
        } else {
            // Se não, retorna a quantidade de dias entre dataInformada e hoje
            const diffEmMilissegundos = hoje - dataInformada;
            return Math.floor(diffEmMilissegundos / (1000 * 60 * 60 * 24));
        }
    }

    useEffect(() => {
        if (userData && userData.CONTRATOS && userData.CONTRATOS.length > 0) {
            const contrs = userData.CONTRATOS;
            const novosDados = [];

            contrs.forEach(cont => {
                const dataPrimeira = cont.PRIMEIRO_RENDIMENTO || cont.PRIMEIRA_VALORIZACAO || null;
                const yieldTerm = cont.YIELDTERM;
                if (dataPrimeira) {
                    const dias = diasDesdeData(dataPrimeira, yieldTerm);
                    novosDados.push({ id: cont.IDCOMPRA, dias });
                }
            });

            setQuantidadeDadosPorContrato(novosDados);
        }
    }, [userData.CONTRATOS]);

    // Lógica para a paginação
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = quantidadeDadosPorContrato.flatMap((transaction) => {
        const rows = [];
        for (let i = 0; i < transaction.dias; i++) {
            const dataAtual = new Date();
            dataAtual.setDate(dataAtual.getDate() - i); // Subtrai i dias da data atual
            rows.push({
                date: formatDate(dataAtual),
                description: `Valorização de contrato ${transaction.id}`,
                value: 'R$ 0.00',
                status: 'Adicionado'
            });
        }
        return rows;
    }).slice(indexOfFirstItem, indexOfLastItem); // Obtém apenas os itens da página atual

    const totalPages = Math.ceil(quantidadeDadosPorContrato.flatMap((transaction) => transaction.dias).reduce((acc, dias) => acc + dias, 0) / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleInputPageChange = (e) => {
        const pageNumber = Number(e.target.value);
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <SideBarBox>
            <T.ExtratoValorizacaoContainer>
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
                                    currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.date}</td>
                                            <td>{item.description}</td>
                                            <td>{item.value}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    ))
                                ) : (

                                    <tr>
                                    <td colSpan="4">Carregando...</td>
                                </tr>
                            )}
                        </tbody>
                    </T.Table>
                </T.TabelaContainer>
                {/* Pagination Controls */}
                <T.Pagination>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Anterior
                    </button>
                    <span>{`Página ${currentPage} de ${totalPages}`}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Próximo
                    </button>
                    <input
                        type="number"
                        min="1"
                        max={totalPages}
                        placeholder="Digite a Página"
                        onChange={handleInputPageChange}
                    />
                </T.Pagination>
            </T.PrincipalContent>
        </T.ExtratoValorizacaoContainer>
    </SideBarBox>
);
};

export default ExtratoValorizacao;