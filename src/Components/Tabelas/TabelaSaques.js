import React, { useContext, useState, useEffect } from 'react';
import * as Style from './TabelaSaquesStyle';
import { AuthContext } from '../../context/AuthContext';

const TabelaDeSaques = () => {
    const [saques, setSaques] = useState([]);
    const { userData } = useContext(AuthContext);

    // Função para formatar a data no formato desejado
    const formatarData = (dataString) => {
        const [datePart, timePart] = dataString.split(' ');
        const [year, month, day] = datePart.split('-');
        return `${day}/${month}/${year} ${timePart}`;
    };

    useEffect(() => {
        const allSaques = []; // Nova array para acumular os saques

        if (userData && Array.isArray(userData.CONTRATOS)) {
            userData.CONTRATOS.forEach(ctr => {
                if(ctr.SAQUES_FEITOS && ctr.SAQUES_FEITOS.length > 0) {
                    ctr.SAQUES_FEITOS.forEach(saq => {
                        allSaques.push(saq); // Adiciona cada saque à nova array
                    });
                    console.log(1)
                }
            });
        }




        // Ordena os saques pela data mais recente
        allSaques.sort((a, b) => new Date(b.DATASOLICITACAO) - new Date(a.DATASOLICITACAO));

        setSaques(allSaques); // Atualiza o estado apenas uma vez
    }, [userData]);

    return (
        <>
            <Style.Tabela>
                <Style.TabelaHead>
                    <Style.TabelaRow>
                        <Style.TabelaHeader>Data Solicitação</Style.TabelaHeader>
                        <Style.TabelaHeader>Descrição</Style.TabelaHeader>
                        <Style.TabelaHeader>Valor</Style.TabelaHeader>
                        <Style.TabelaHeader>Valor recebível</Style.TabelaHeader>
                        <Style.TabelaHeader>Status</Style.TabelaHeader>
                    </Style.TabelaRow>
                </Style.TabelaHead>
                <Style.TabelaBody>
                    {saques.length === 0 ? (
                        <Style.TabelaRow>
                            <Style.TabelaData colSpan="5">Ainda não há saques.</Style.TabelaData>
                        </Style.TabelaRow>
                    ) : (
                        saques.map((dado, index) => (
                            <Style.TabelaRow key={index}>
                                <Style.TabelaData>{formatarData(dado.DATASOLICITACAO)}</Style.TabelaData>
                                <Style.TabelaData>Saque no valor de R${dado.VALORSOLICITADO.toFixed(2)} do contrato {dado.IDCOMPRA}</Style.TabelaData>
                                <Style.TabelaData>{(dado.VALORSOLICITADO).toFixed(2)}</Style.TabelaData>
                                <Style.TabelaData>{dado.VALORSOLICITADOTAXA ? dado.VALORSOLICITADOTAXA : (parseFloat(dado.VALORSOLICITADO) - (parseFloat(dado.VALORSOLICITADO)*0.04)).toFixed(2)}</Style.TabelaData>
                                <Style.TabelaData>{dado.STATUS === 1 ? "Pendente" : dado.STATUS === 2 ? 'PAGO' : "CANCELADO"}</Style.TabelaData>
                            </Style.TabelaRow>
                        ))
                    )}
                </Style.TabelaBody>
            </Style.Tabela>
        </>
    );
}

export default TabelaDeSaques;
