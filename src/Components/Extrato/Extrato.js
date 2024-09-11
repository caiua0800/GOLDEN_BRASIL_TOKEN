import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as E from './ExtratoStyle';
import Loading from "../Loading/Loader";
import { Sidebar } from "../Sidebar/Sidebar";
import assets from "../../assets/assets";
import TabelaExtrato from "../Tabelas/TabelaExtrato";
import SideBarBox from "../Sidebar/SideBarBox";

// Função para calcular datas de início e fim baseadas no filtro
const getDateRange = (filter) => {
    const now = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (filter) {
        case '7 Dias':
            startDate.setDate(now.getDate() - 7);
            break;
        case '15 Dias':
            startDate.setDate(now.getDate() - 15);
            break;
        case '1 Mês':
            startDate.setMonth(now.getMonth() - 1);
            break;
        default:
            startDate = new Date(0); // Desde o Início
            break;
    }

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return { startDate: formatDate(startDate), endDate: formatDate(endDate) };
};

export default function Extrato() {
    const { userData } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('Desde o Início');

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    }

    useEffect(() => {
        setLoading(true);

        setTimeout(() => { setLoading(false) }, 1000);

    }, []);

    if (loading) {
        return (
            <E.LoadBox>
                <Loading />
            </E.LoadBox>
        )
    }

    if (error) {
        return <div>{error}</div>;
    }

    const dateRange = getDateRange(filter);

    return (
        <SideBarBox>
            <E.ExtratoContainer>
                <E.LoginBehind src="logo-golden.png" />
                <E.PrincipalContent>
                    <E.ContainerTitle>
                        <p>EXTRATO DA CONTA</p>
                    </E.ContainerTitle>
                    <E.ButtonContainer>
                        <E.FilterButton onClick={() => handleFilterChange('Desde o Início')}>Desde o Início</E.FilterButton>
                        <E.FilterButton onClick={() => handleFilterChange('7 Dias')}>7 Dias</E.FilterButton>
                        <E.FilterButton onClick={() => handleFilterChange('15 Dias')}>15 Dias</E.FilterButton>
                        <E.FilterButton onClick={() => handleFilterChange('1 Mês')}>1 Mês</E.FilterButton>
                        {/* <E.FilterButton onClick={() => handleFilterChange('Valorizacao')}>Valorização</E.FilterButton> */}
                    </E.ButtonContainer>
                    <TabelaExtrato startDate={dateRange.startDate} endDate={dateRange.endDate} filter={filter} />
                </E.PrincipalContent>
            </E.ExtratoContainer>
        </SideBarBox>
    );
}
