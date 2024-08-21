import React, { useState, useContext } from "react";
import * as M from './ModalStyle';
import PDFGenerator from "./PDFGenerator";
import { AuthContext } from "../../../context/AuthContext";
import { formatCPF, gerarStringAleatoria, GeneratePIX_MP, separarNome, GenerateBOLETO_MP } from "../../../assets/utils";
import axios from "axios";
import Loading from "../../Loading/Loader";

const BASE_ROUTE = process.env.REACT_APP_BASE_ROUTE;
const CRIAR_CONTRATO = process.env.REACT_APP_CRIAR_CONTRATO;
const GERAR_PIX = process.env.REACT_APP_GERAR_PIX;

export default function Modal({ modalData, handleModalCompra, handleOpenPopUp, setPopUpMessage, reloadUserData }) {
    const [assinatura, setAssinatura] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const { userData } = useContext(AuthContext);
    const [paymentMethod, setPaymentMethod] = useState('PIX'); // Estado para método de pagamento


    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            setAssinatura('assinado');
        } else {
            setAssinatura('');
        }
    };

    const handlePostPIX = async (data) => {
        try {
            const response = await GeneratePIX_MP(data);
            const ticket = response.data.point_of_interaction.transaction_data.ticket_url;
            console.log(ticket);
            return ticket; 
        } catch (error) {
            console.log("Erro ao gerar PIX: ", error);
            return null; 
        }
    }

    const handlePostBOLETO = async (data) => {
        try {
            const response = await GenerateBOLETO_MP(data);
            const ticket = response.data.transaction_details.external_resource_url;
            return ticket; 
        } catch (error) {
            console.log("Erro ao gerar BOLETO: ", error);
            return null; 
        }
    }

    const handleConfirmarCompra = async () => {
        if (assinatura !== 'assinado') {
            alert('Por favor, assine o contrato antes de confirmar a compra.');
            return;
        }

        if (userData) {
            setLoading(true)

            const mp_data_pix = {
                transaction_amount: parseFloat(((parseFloat(modalData.valorPorContrato) * parseFloat(modalData.qttContratos)) * 5.5).toFixed(2)),
                description: `Compra de ${modalData.qttContratos} para ${userData.CPF}`,
                paymentMethodId: paymentMethod.toLowerCase(), // Use o valor do estado paymentMethod
                email: userData.EMAIL,
                identificationType: "CPF",
                number: '075.411.521-61'
            }

            const separeted_name = separarNome(userData.NAME);

            const mp_data_boleto = {
                transaction_amount: parseFloat(((parseFloat(modalData.valorPorContrato) * parseFloat(modalData.qttContratos)) * 5.5).toFixed(2)),
                description: `Compra de ${modalData.qttContratos} para ${userData.CPF}`,
                paymentMethodId: paymentMethod.toLowerCase(), // Use o valor do estado paymentMethod
                email: userData.EMAIL,
                first_name:separeted_name[0],
                last_name:separeted_name[1],
                identificationType: "CPF",
                number: '075.411.521-61'
            }

            var ticket = null;

            switch(paymentMethod){
                case "PIX":
                    ticket = await handlePostPIX(mp_data_pix);
                    break;
                case "DEPOSITO":
                    break;
                case "BOLETO":
                    ticket = await handlePostBOLETO(mp_data_boleto)
                default:
                    break;
            }


            const requestData = {
                USERNAME: usuario,
                CPF: userData.CPF,
                docId: userData.CPF,
                contratoData: {
                    COINS: parseFloat(modalData.qttContratos),
                    COINVALUE: parseFloat(modalData.valorPorContrato),
                    CURRENTINCOME: "0",
                    IDCOMPRA: gerarStringAleatoria(),
                    MAXIMUMNUMBEROFDAYSTOYIELD: "36",
                    MAXIMUMQUOTAYIELD: "150",
                    RENDIMENTO_ATUAL: 0,
                    STATUS: 4,
                    TOTALINCOME: "0",
                    TOTALSPENT: (parseFloat(modalData.valorPorContrato) * parseFloat(modalData.qttContratos)).toFixed(2),
                    TICKET: ticket
                }
            };

            try {
                const response = await axios.post(`${BASE_ROUTE}${CRIAR_CONTRATO}`, requestData);

                const type = response.data.includes('sucesso') ? 'success' : 'success';
                setPopUpMessage(response.data);
                handleOpenPopUp(type);
                handleModalCompra();
                reloadUserData();
                setLoading(false);

            } catch (error) {
                console.error("Erro ao adicionar contrato:", error);
                setPopUpMessage('Ocorreu um erro ao processar sua compra. Por favor, tente novamente.');
                setLoading(false);
                handleOpenPopUp('error');
            }
        }
        setLoading(false);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value); 
        console.log(event.target.value)
    };

    return (
        <M.ModalContainer>
            <M.ModalBox>
                {loading && (
                    <M.LoadingBuy>
                        <Loading load={loading} />
                    </M.LoadingBuy>
                )}

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

                <M.PayFormDiv>
                    <select value={paymentMethod} onChange={handlePaymentMethodChange}> {/* Aqui você liga o onChange */}
                        <option value="PIX">PIX</option>
                        <option value="DEPOSITO">DEPOSITO</option>
                        <option value="BOLETO">BOLETO</option>
                    </select>
                </M.PayFormDiv>

                <M.ConfirmacaoDeCadastro>
                    <span>CONFIRME SEU LOGIN PARA REALIZAR A COMPRA</span>
                    <M.LoginBox>
                        <input
                            placeholder="usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                        <input
                            placeholder="CPF"
                            type="text"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </M.LoginBox>
                    <button onClick={handleConfirmarCompra}>CONFIRMAR E COMPRAR</button>
                </M.ConfirmacaoDeCadastro>
            </M.ModalBox>
        </M.ModalContainer>
    );
}
