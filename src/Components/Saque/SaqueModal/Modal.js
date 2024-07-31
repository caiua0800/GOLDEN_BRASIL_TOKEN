import React, { useState, useContext } from "react";
import * as M from './ModalStyle';
import { formatNumber } from '../../../assets/utils';
import { AuthContext } from "../../../context/AuthContext";
import { atualizarSaque } from "../../../database/firebaseService";

export default function Modal({ handleModalSaque }) {
    const [valorSolicitado, setValorSolicitado] = useState('');
    const { userData, reloadUserData } = useContext(AuthContext);
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const disponivelSaque = userData && userData.DISPONIVEL_SAQUE ? parseFloat(userData.DISPONIVEL_SAQUE) : 0;
    const valorSolicitadoNumber = parseFloat(valorSolicitado.replace(',', '.')) || 0;
    const valorRestante = Math.max(disponivelSaque - valorSolicitadoNumber, 0); 

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
        try {
            await atualizarSaque(userData, valorSolicitado, reloadUserData);
            console.log('solicitação de saque feita')
        } catch (error) {
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
                            placeholder="senha"
                            type="password"
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
