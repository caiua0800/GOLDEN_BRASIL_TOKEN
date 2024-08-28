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
    const [valorMinimo, serValorMinimo] = useState(25)

    let corSolicitado;
    if (valorSolicitadoNumber < disponivelSaque) {
        corSolicitado = 'green';
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


        if(parseFloat(userData.DISPONIVEL_SAQUE) < parseFloat(valorSolicitado)){
            alert(`Valor insuficiente.`)
            return;
        }

        if(parseFloat(valorSolicitado) < 25){
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
                VALORSOLICITADO: parseFloat(valorSolicitado)
            }
        }
        try {
            const response = await axios.post(`${BASE_ROUTE}${CRIAR_SAQUE}`, requestData);
            console.log('solicitação de saque feita', response)        
            hidePulse()
            reloadUserData();
            setTimeout(()=> {alert('solicitação de saque feita!');},1000);
        } catch (error) {
            hidePulse()
            alert("Erro ao atualizar saque: ", error);
            console.log(error)
        }
        handleModalSaque();

    }

    return (
        <M.ModalContainer>
            <M.ModalBox>
                <M.FecharModalBtn>
                    <span onClick={handleModalSaque}>Fechar e Cancelar</span>
                </M.FecharModalBtn>

                <M.ModalTitle>
                    <h1>SOLICITAÇÃO DE SAQUE</h1>
                </M.ModalTitle>

                <M.ValorASerSacado>
                    <input
                        placeholder="DIGITE O VALOR DESEJADO"
                        value={valorSolicitado}
                        onChange={handleInputChange}
                    />
                    <h2>DISPONÍVEL: U${formatNumber(disponivelSaque)}</h2>
                    <h3 style={{ color: corSolicitado }}>
                        SOLICITADO: U${formatNumber(valorSolicitadoNumber)}
                    </h3>
                    <h4>
                        RESTANTE: U${formatNumber(valorRestante)}
                    </h4>
                </M.ValorASerSacado>

                <M.ConfirmacaoDeCadastro>
                    <span>CONFIRME SEU LOGIN PARA REALIZAR O SAQUE</span>
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
            </M.ModalBox>
        </M.ModalContainer>
    );
}
