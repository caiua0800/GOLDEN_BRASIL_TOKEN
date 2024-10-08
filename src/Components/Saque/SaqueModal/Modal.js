import React, { useState, useContext, useEffect } from "react";
import * as M from './ModalStyle';
import { formatNumber } from '../../../assets/utils';
import { AuthContext } from "../../../context/AuthContext";
import { atualizarSaque } from "../../../database/firebaseService";
import { usePulse } from "../../../context/LoadContext";
import axios from "axios";



const BASE_ROUTE = process.env.REACT_APP_BASE_ROUTE;
const CRIAR_SAQUE = process.env.REACT_APP_CRIAR_SAQUE;
const CRIAR_SAQUE_IND = process.env.REACT_APP_CRIAR_SAQUE_IND;

export default function Modal({ handleModalSaque }) {
    const [valorSolicitado, setValorSolicitado] = useState('');
    const { userData, reloadUserData } = useContext(AuthContext);
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const disponivelSaque = userData && userData.DISPONIVEL_SAQUE ? parseFloat(userData.DISPONIVEL_SAQUE) : 0;
    const valorSolicitadoNumber = parseFloat(valorSolicitado.replace(',', '.')) || 0;
    const valorRestante = Math.max(disponivelSaque - valorSolicitadoNumber, 0);
    const { showPulse, hidePulse } = usePulse()
    const [disponivelSaqueHoje, setDisponivelSaqueHoje] = useState(0);
    const [valorMinimo, serValorMinimo] = useState(150)
    const [selectedIndication, setSelectedIndication] = useState(false)
    const taxa = 0.04;

    const [selectedContract, setSelectedContract] = useState(null);

    let corSolicitado;
    if (valorSolicitadoNumber < disponivelSaque) {
        corSolicitado = '#4dff00';
    } else if (valorSolicitadoNumber === disponivelSaque) {
        corSolicitado = 'blue';
    } else {
        corSolicitado = 'red';
    }

    const handleInputChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9,]/g, '').replace(/^,/, '').replace(/,{2,}/g, ',');
        if (value.startsWith('-')) value = value.slice(1);
        setValorSolicitado(value);
    };

    const handleSolicitarSaque = async () => {

        if (parseFloat(userData.DISPONIVEL_SAQUE) < (valorSolicitadoNumber)) {
            alert(`Valor insuficiente.`)
            return;
        }

        if ((valorSolicitadoNumber) < valorMinimo) {
            alert(`O valor mínimo para saque é de R$${valorMinimo}`)
            return;
        }


        if (!selectedIndication) {
            showPulse();

            const requestData = {
                USERNAME: usuario,
                CPF: senha,
                docId: userData.CPF,
                saqueData: {
                    CODCLI: userData.CPF,
                    STATUS: 1,
                    VALORSOLICITADO: (valorSolicitadoNumber),
                    VALORSOLICITADOTAXA: valorSolicitadoNumber - (valorSolicitadoNumber * taxa),
                    IDCOMPRA: selectedContract.IDCOMPRA
                }
            }
            try {
                const response = await axios.post(`${BASE_ROUTE}${CRIAR_SAQUE}`, requestData);
                console.log('solicitação de saque feita', response)
                hidePulse()
                reloadUserData();
                setTimeout(() => { alert('solicitação de saque feita!'); }, 1000);
            } catch (error) {
                hidePulse()
                alert("Erro ao atualizar saque: ", error);
                console.log(error)
            }

            handleModalSaque();
        } else {
            showPulse();

            const requestData = {
                userId: userData.CPF,
                saqueData: {
                    VALORSOLICITADO: (valorSolicitadoNumber),
                    VALORSOLICITADOTAXA: valorSolicitadoNumber - (valorSolicitadoNumber * taxa),
                }
            }
            try {
                const response = await axios.post(`${BASE_ROUTE}${CRIAR_SAQUE_IND}`, requestData);
                console.log('solicitação de saque feita', response)
                hidePulse()
                reloadUserData();
                setTimeout(() => { alert('solicitação de saque feita!'); }, 1000);
            } catch (error) {
                hidePulse()
                alert("Erro ao atualizar saque: ", error);
                console.log(error)
            }

            handleModalSaque();
        }

    }

    const handleCloseModal = () => {
        handleModalSaque();
        setSelectedContract(null);
    }



    const returnValorDisponivel = (contrato) => {
        if (selectedIndication) {
            return userData.TOTAL_INDICACAO || 0;
        }
    
        if (!contrato || !contrato.SAQUES_FEITOS) {
            return 0;
        }
    
        let valorSacado = 0;
    
        contrato.SAQUES_FEITOS.forEach(s => {
            if (s.STATUS === 1 || s.STATUS === 2) {
                valorSacado += parseFloat(s.VALORSOLICITADO);
            }
        });
    
        let valorLucro = (contrato.RENDIMENTO_ATUAL / 100) * parseFloat(contrato.TOTALSPENT);
    
        return valorLucro - valorSacado || 0;
    };
    

    const valorTotalDisponivelHojeFunction = () => {

        if (selectedIndication) {
            return userData.TOTAL_INDICACAO || 0;
        }

        const contratos = userData.CONTRATOS_COM_SAQUE_DISPONIVEL;

        let valorTotalDisponivelHojeSum = 0;

        if (contratos && contratos.length > 0) {
            contratos.forEach(contrato => {
                let valorSacado = 0;

                if (contrato.SAQUES_FEITOS) {
                    contrato.SAQUES_FEITOS.forEach(s => {
                        if (s.STATUS === 1 || s.STATUS === 2) {
                            valorSacado += parseFloat(s.VALORSOLICITADO);
                        }
                    })
                }
                let valorLucro = (contrato.RENDIMENTO_ATUAL / 100) * parseFloat(contrato.TOTALSPENT);

                if (valorLucro && valorSacado)
                    valorTotalDisponivelHojeSum += (valorLucro - valorSacado)
                else {
                    valorTotalDisponivelHojeSum += 0;
                }
            })
        }

        setDisponivelSaqueHoje(valorTotalDisponivelHojeSum)
    }

    useEffect(() => {
        valorTotalDisponivelHojeFunction();
    }, [])


    return (
        <M.ModalContainer>
            <M.ModalBox>
                <M.FecharModalBtn>
                    <span onClick={handleCloseModal}>Fechar e Cancelar</span>
                </M.FecharModalBtn>

                <M.ModalTitle>
                    <h1>SOLICITAÇÃO DE SAQUE</h1>
                </M.ModalTitle>

                <M.ModalSubTitle>
                    <h1>DISPONÍVEL PARA SAQUE: R${formatNumber(disponivelSaqueHoje)}</h1>
                </M.ModalSubTitle>


                {userData.CONTRATOS_COM_SAQUE_DISPONIVEL.length > 0 ? (
                    <M.Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>VALOR DISPONÍVEL</th>
                            </tr>
                        </thead>

                        <tbody>
                            {userData.CONTRATOS_COM_SAQUE_DISPONIVEL.map(c => (
                                <tr
                                    key={c.IDCOMPRA}
                                    onClick={() => { setSelectedContract(c); setSelectedIndication(false) }}
                                    style={{ color: selectedContract === c ? 'green' : 'black', cursor: 'pointer' }}
                                >
                                    <td>{c.IDCOMPRA}</td>
                                    <td>R${returnValorDisponivel(c).toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr
                                style={{ color: selectedIndication ? 'green' : 'black', cursor: 'pointer' }}
                                key="IndicacaoValue"
                                onClick={() => { setSelectedIndication(true); setSelectedContract(null) }}
                            >
                                <td>INDICAÇÃO</td>
                                <td>R${userData.TOTAL_INDICACAO.toFixed(2)}</td>
                            </tr>
                        </tbody>

                    </M.Table>
                ) : (
                    <>
                        <M.Nenhum>Nenhum contrato disponível para saque</M.Nenhum>

                        <M.Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>VALOR DISPONÍVEL</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr
                                    style={{ color: selectedIndication ? 'green' : 'black', cursor: 'pointer' }}
                                    key="IndicacaoValue"
                                    onClick={() => { setSelectedIndication(true); setSelectedContract(null) }}
                                >
                                    <td>INDICAÇÃO</td>
                                    <td>R${userData.TOTAL_INDICACAO.toFixed(2)}</td>
                                </tr>
                            </tbody>

                        </M.Table>
                    </>

                )}


                {(selectedContract || selectedIndication) && (

                    <>

                        <M.ValorASerSacado>
                            <h2>Selecione o valor do saque</h2>
                            <input value={valorSolicitado} onChange={handleInputChange} />

                            {returnValorDisponivel(selectedContract) - valorSolicitadoNumber >= 0 ? (
                                <>
                                    <span>{valorSolicitado != "" ? "Valor disponível" : ""} </span>
                                    <span>{valorSolicitado != "" ? "VALOR COM TAXA: R$" + (parseFloat(valorSolicitado) - (parseFloat(valorSolicitado) * taxa)) : ""}</span>
                                </>
                            ) : (
                                <span>Saldo do contrato insuficiente.</span>
                            )}
                        </M.ValorASerSacado>


                        <M.ConfirmacaoDeCadastro>
                            <span>CONFIRME SEU CADASTRO PARA REALIZAR O SAQUE</span>
                            <M.LoginBox>
                                <input
                                    placeholder="usuario"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                />
                                <input
                                    placeholder="cpf"
                                    type="TEXT"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </M.LoginBox>
                            <button onClick={handleSolicitarSaque}>CONFIRMAR E SACAR</button>
                        </M.ConfirmacaoDeCadastro>
                    </>

                )}

            </M.ModalBox>
        </M.ModalContainer>
    );
}
