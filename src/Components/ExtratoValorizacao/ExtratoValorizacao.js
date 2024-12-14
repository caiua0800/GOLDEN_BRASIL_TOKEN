import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as T from './ExtratoValorizacaoStyle';
import SideBarBox from "../Sidebar/SideBarBox";
import TabelaValorizacao from "../Tabelas/TabelaValorizacao";

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

                if (dataPrimeira)
                    novosDados.push(dataPrimeira)
            });

            // console.log(novosDados)
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

    return (
        <SideBarBox>
            <T.ExtratoValorizacaoContainer>
                <T.PrincipalContent>
                    <T.ContainerTitle>Histórico de Valorização</T.ContainerTitle>
                    {/* <T.FiltrePeloId>
                        <input
                            onChange={handleFilterChange}
                            placeholder="Filtre pelo ID"
                            type="text"
                            value={filterId}
                        />
                    </T.FiltrePeloId> */}
                    <T.TabelaContainerzinho>
                        <TabelaValorizacao />
                    </T.TabelaContainerzinho>
                </T.PrincipalContent>
            </T.ExtratoValorizacaoContainer>
        </SideBarBox>
    );
};

export default ExtratoValorizacao;