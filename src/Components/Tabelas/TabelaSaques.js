import React, { useContext, useState, useEffect } from 'react';
import * as Style from './TabelaSaquesStyle';
import { AuthContext } from '../../context/AuthContext';

const TabelaDeSaques = () => {
    const [saques, setSaques] = useState([]);
    const { userData } = useContext(AuthContext);

    // Função para formatar a data no formato desejado
    const formatarData = (dataString) => {
        if (typeof dataString !== 'string') {
            return "Data Inválida"; // Ou outro valor padrão
        }

        const [datePart, timePart] = dataString.split(' ');
        if (!datePart || !timePart) {
            return "Data Inválida";
        }
        const [year, month, day] = datePart.split('-');
        return `${day}/${month}/${year} ${timePart}`;
    };

    useEffect(() => {
        const allSaques = [];

        if (userData) {
            if (Array.isArray(userData.CONTRATOS)) {
                userData.CONTRATOS.forEach(ctr => {
                    if (ctr.SAQUES_FEITOS && ctr.SAQUES_FEITOS.length > 0) {
                        ctr.SAQUES_FEITOS.forEach(saq => {
                            if (saq.description !== "Saque Anônimo" && saq.description !== "Descontar") {
                                allSaques.push(saq);
                            }
                        });
                    }
                });
            }

            // Inclui SAQUES_INDICACAO
            if (Array.isArray(userData.SAQUES_INDICACAO)) {
                userData.SAQUES_INDICACAO.forEach(saqInd => {
                    if(parseFloat(saqInd.VALOR) > 0)
                        allSaques.push({
                            ...saqInd,
                            isIndication: true,
                            description: saqInd.DESCRIPTION || "Saque de Indicação",
                            VALORSOLICITADO: saqInd.VALOR,
                            VALORSOLICITADOTAXA: saqInd.VALORSOLICITADOTAXA || saqInd.VALOR
                        });
                });
            }
        }

        allSaques.sort((a, b) => new Date(b.DATASOLICITACAO) - new Date(a.DATASOLICITACAO));
        setSaques(allSaques);
    }, [userData]);


    const handleDescription = (des) => {
        if (des && des.toUpperCase().includes("DESCONTAR")) {
            return "Saque Manual feito pela Golden"
        } else {
            return null;
        }
    }

    const Gerar_Id_Unico = (cpf, dataSolicitacao) => {
        if (cpf && dataSolicitacao) {
            const last4 = cpf.slice(-4);

            const timeParts = dataSolicitacao.split(" ")[1].split(":") || "1910";
            const min = timeParts[1];
            const ss = timeParts[2];

            // Gera um número aleatório entre 100 e 999
            const randomNumber = Math.floor(Math.random() * 900) + 100;

            return `${last4}${min}${ss}${randomNumber}`;
        }
        return "000";
    };


    return (
        <>
            <Style.Tabela>
                <Style.TabelaHead>
                    <Style.TabelaRow>
                        {/* <Style.TabelaHeader>ID</Style.TabelaHeader> */}
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
                            dado.description != "Descontar" && (
                                <Style.TabelaRow key={index}>
                                    {/* <Style.TabelaData>{"id"}</Style.TabelaData> */}
                                    <Style.TabelaData>{formatarData(dado.DATASOLICITACAO)}</Style.TabelaData>
                                    <Style.TabelaData>
                                        {dado.isIndication ? (
                                            `Saque de Indicação de R$${dado.VALORSOLICITADOTAXA ? dado.VALORSOLICITADOTAXA : dado.VALORSOLICITADO.toFixed(2)}`
                                        ) : handleDescription(dado.description) === null ? (
                                            `Saque no valor de R$${dado.VALORSOLICITADO.toFixed(2)} do contrato ${dado.IDCOMPRA}`
                                        ) : (
                                            `${handleDescription(dado.description)} de R$${dado.VALORSOLICITADOTAXA ? dado.VALORSOLICITADOTAXA : dado.VALORSOLICITADO.toFixed(2)}`
                                        )}
                                    </Style.TabelaData>

                                    <Style.TabelaData>{(dado.VALORSOLICITADO).toFixed(2)}</Style.TabelaData>
                                    <Style.TabelaData>{dado.VALORSOLICITADO ? (parseFloat(dado.VALORSOLICITADO) - (parseFloat(dado.VALORSOLICITADO) * 0.04)).toFixed(2) : 0}</Style.TabelaData>
                                    <Style.TabelaData>{dado.STATUS === 1 ? "Pendente" : dado.STATUS === 2 ? 'PAGO' : "CANCELADO"}</Style.TabelaData>
                                </Style.TabelaRow>
                            )

                        ))
                    )}
                </Style.TabelaBody>
            </Style.Tabela>
        </>
    );
}

export default TabelaDeSaques;
