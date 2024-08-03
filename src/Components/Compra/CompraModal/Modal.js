import React, { useState, useContext } from "react";
import * as M from './ModalStyle';
import PDFGenerator from "./PDFGenerator";
import { AuthContext } from "../../../context/AuthContext";
import PopUp from '../../PopUp/PopUp'; // Importe o PopUp
import { gerarStringAleatoria } from "../../../assets/utils";
import axios from "axios";

export default function Modal({ modalData, handleModalCompra, handleOpenPopUp, setPopUpMessage, reloadUserData }) {
    const [assinatura, setAssinatura] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false); 
    const { userData } = useContext(AuthContext);

    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            setAssinatura('assinado');
        } else {
            setAssinatura('');
        }
    };

    const handleConfirmarCompra = async () => {

        if (assinatura !== 'assinado') {
            alert('Por favor, assine o contrato antes de confirmar a compra.');
            return;
        }

        if (userData) {
            const requestData = {
                USERNAME: usuario,
                PASSWORD: senha,
                docId: userData.CPF,
                contratoData: {
                    COINS: modalData.qttContratos,
                    COINVALUE: modalData.qttContratos,
                    CURRENTINCOME: "0",
                    IDCOMPRA: gerarStringAleatoria(),
                    MAXIMUMNUMBEROFDAYSTOYIELD: "36",
                    MAXIMUMQUOTAYIELD: "150",
                    RENDIMENTO_ATUAL: 0,
                    STATUS: 4,
                    TOTALINCOME: "0",
                    TOTALSPENT: (parseFloat(modalData.valorPorContrato)*parseFloat(modalData.qttContratos)).toFixed(2),
                }
            };

            try {
                const response = await axios.post('http://localhost:4000/clientes/criarContrato', requestData);

                const type = response.data.includes('sucesso') ? 'success' : 'error';
                setPopUpMessage(response.data);
                handleOpenPopUp(type);
                handleModalCompra();
                reloadUserData()
            } catch (error) {
                console.error("Erro ao adicionar contrato:", error);
                setPopUpMessage('Ocorreu um erro ao processar sua compra. Por favor, tente novamente.');
                handleOpenPopUp('error');
            }
        }
    };

    return (
        <M.ModalContainer>
            <M.ModalBox>
                <M.FecharModalBtn>
                    <span onClick={handleModalCompra}>Fechar e Cancelar</span>
                </M.FecharModalBtn>

                <M.ModalPDFContainer>
                    <PDFGenerator ContratoData={modalData} assinatura={assinatura} />
                </M.ModalPDFContainer>
                <M.CheckboxContainer>
                    <label>
                        <input
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            checked={assinatura === 'assinado'}
                        />
                        Assinar contrato
                    </label>
                </M.CheckboxContainer>

                <M.ConfirmacaoDeCadastro>
                    <span>CONFIRME SEU LOGIN PARA REALIZAR A COMPRA</span>
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
                    <button onClick={handleConfirmarCompra}>CONFIRMAR E COMPRAR</button>
                </M.ConfirmacaoDeCadastro>
            </M.ModalBox>

            {loading && (
                <div>Loading...</div> // Substitua isso com seu componente de loading
            )}

        </M.ModalContainer>
    );
}
