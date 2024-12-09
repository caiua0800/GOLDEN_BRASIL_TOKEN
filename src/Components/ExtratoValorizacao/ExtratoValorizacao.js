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

    // Função que calcula a quantidade de dias desde uma data até hoje ou até o termo de rendimento
    function diasDesdeData(dataString, yieldTerm) {
        const dataInformada = new Date(dataString);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const termoRendimento = new Date(yieldTerm);
        termoRendimento.setHours(0, 0, 0, 0);

        return hoje > termoRendimento
            ? Math.floor((termoRendimento - dataInformada) / (1000 * 60 * 60 * 24))
            : Math.floor((hoje - dataInformada) / (1000 * 60 * 60 * 24));
    }

    useEffect(() => {
        if (userData && userData.CONTRATOS && userData.CONTRATOS.length > 0) {
            const contrs = userData.CONTRATOS;
            const novosDados = [];
            contrs.forEach(cont => {
                var dataPrimeira = cont.PRIMEIRO_RENDIMENTO || cont.PRIMEIRA_VALORIZACAO || null;

                if(dataPrimeira)
                    novosDados.push(dataPrimeira)
                // const yieldTerm = cont.YIELDTERM;

                // var aux1 = dataPrimeira.replace("/", "-").replace("/", "-").split("-")
                // var aux2 = aux1[2].split(" ");
                // var novaData = `${aux2[0]}-${aux1[1]}-${aux1[0]} ${aux2[1]}`
                // dataPrimeira = novaData;

                // if (dataPrimeira) {
                //     const dias = diasDesdeData(dataPrimeira, yieldTerm);
                //     novosDados.push({ id: cont.IDCOMPRA, dias, diario: ((parseFloat(cont.MAXIMUMQUOTAYIELD) / (parseFloat(cont.MAXIMUMNUMBEROFDAYSTOYIELD) * 31)/100)*parseFloat(cont.TOTALSPENT)) });
                // } else {
                //     console.log(dataPrimeira)
                // }
            });

            console.log(novosDados)
            setQuantidadeDadosPorContrato(novosDados);
        }
    }, [userData.CONTRATOS]);

    const handleFilterChange = (event) => {
        setFilterId(event.target.value);
        setCurrentPage(1); // Resetar para a primeira página ao aplicar o filtro
    };

    const filteredItems = quantidadeDadosPorContrato.flatMap((transaction) => {
        return Array.from({ length: transaction.dias }, (_, i) => ({
            date: formatDate(new Date(new Date().setDate(new Date().getDate() - i))),
            description: `Valorização de contrato ${transaction.id}`,
            value: transaction.diario.toFixed(2),
            status: 'Adicionado',
            id: transaction.id // Adiciona o id para a comparação
        })).filter(item => item.id.toString().includes(filterId)); // filtra por ID
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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
                    <T.FiltrePeloId>
                        <input
                            onChange={handleFilterChange}
                            placeholder="Filtre pelo ID"
                            type="text"
                            value={filterId}
                        />
                    </T.FiltrePeloId>
                    <T.TabelaContainer>
                        <T.Table>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Descrição</th>
                                    <th>Valor</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 ? (
                                    currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.date}</td>
                                            <td>{item.description}</td>
                                            <td>+ R${item.value}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">Nenhum registro correspondente encontrado.</td>
                                    </tr>
                                )}
                            </tbody>
                        </T.Table>
                    </T.TabelaContainer>
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