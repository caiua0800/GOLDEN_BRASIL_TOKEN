import React, { useState, useContext } from "react";
import * as M from './ModalStyle';
import { formatNumber } from '../../../assets/utils';
import { AuthContext } from "../../../context/AuthContext";
import { atualizarSaque } from "../../../database/firebaseService";
import { usePulse } from "../../../context/LoadContext";
import axios from "axios";



const BASE_ROUTE = process.env.REACT_APP_BASE_ROUTE
const CRIAR_SAQUE = process.env.REACT_APP_CRIAR_SAQUE

export default function Modal({ handleModalSaque }) {
    const [valorSolicitado, setValorSolicitado] = useState('');
    const { userData, reloadUserData } = useContext(AuthContext);
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const disponivelSaque = userData && userData.DISPONIVEL_SAQUE ? parseFloat(userData.DISPONIVEL_SAQUE) : 0;
    const valorSolicitadoNumber = parseFloat(valorSolicitado.replace(',', '.')) || 0;
    const valorRestante = Math.max(disponivelSaque - valorSolicitadoNumber, 0);
    const { showPulse, hidePulse } = usePulse()
    const [valorMinimo, serValorMinimo] = useState(150)
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

    }

    const handleCloseModal = () => {
        handleModalSaque();
        setSelectedContract(null);
    }

    return (
        <M.ModalContainer>
            <M.ModalBox>
                <M.FecharModalBtn>
                    <span onClick={handleCloseModal}>Fechar e Cancelar</span>
                </M.FecharModalBtn>

                <M.ModalTitle>
                    <h1>SOLICITAÇÃO DE SAQUE</h1>
                </M.ModalTitle>


                <M.ContratosDisponiveis>
                    <p>SELECIONE O CONTRATO QUE DESEJA SACAR O LUCRO</p>
                    <M.Nenhum>{userData.CONTRATOS_COM_SAQUE_DISPONIVEL.length === 0 ? "Nenhum contrato disponível para saque" : ""}</M.Nenhum>
                    <ul>
                        {userData.CONTRATOS_COM_SAQUE_DISPONIVEL.length > 0 && userData.CONTRATOS_COM_SAQUE_DISPONIVEL.map(c => (
                            <li
                                key={c.IDCOMPRA} // Sempre adicionar uma chave única quando mapear elementos
                                onClick={() => { setSelectedContract(c) }}
                                style={{ color: selectedContract === c ? 'green' : 'black' }} // Adicione esta linha
                            >
                                <M.Contratinho>

                                    <img alt="example-ctr" src="contrato-icon.png" />
                                    <div>
                                        CONTRATO: <span>{c.IDCOMPRA}, VALOR DISPONÍVEL: R${c.DISPONIVEL_SAQUE.toFixed(2)}</span>
                                    </div>
                                    
                                </M.Contratinho>

                            </li>
                        ))}
                    </ul>

                </M.ContratosDisponiveis>


                {selectedContract && (

                    <>

                        <M.ValorASerSacado>
                            <h2>Selecione o valor do saque</h2>
                            <input value={valorSolicitado} onChange={handleInputChange} />

                            {selectedContract.DISPONIVEL_SAQUE - valorSolicitadoNumber >= 0 ? (
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
