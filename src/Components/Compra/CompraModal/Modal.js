import React, { useState, useContext } from "react";
import * as M from './ModalStyle';
import PDFGenerator from "./PDFGenerator";
import { AuthContext } from "../../../context/AuthContext";
import PopUp from '../../PopUp/PopUp'; // Importe o PopUp

export default function Modal({ modalData, handleModalCompra, criarCompraDB, handleOpenPopUp }) {
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

        try {
            const response = await fetch('http://localhost:4000/api/client/confirmation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    USUARIO: usuario,
                    DocId: userData.CPF,
                    PASSWORD: senha,
                }),
            });

            if (response.ok) {
                handleModalCompra();
                setLoading(true);
                handleOpenPopUp()

                setTimeout(() => {
                    criarCompraDB();
                    setLoading(false);
                }, 3000); 
            } else {
                alert('Falha na confirmação. Verifique suas credenciais e tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao confirmar compra:', error);
            alert('Ocorreu um erro ao tentar confirmar a compra.');
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
