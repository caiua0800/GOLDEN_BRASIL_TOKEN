import React, { useState, useContext, useEffect } from "react";
import * as M from './ModalStyle';
import PDFGenerator from "./PDFGenerator";
import { AuthContext } from "../../../context/AuthContext";
import { formatCPF, gerarStringAleatoria, GeneratePIX_MP, separarNome, GenerateBOLETO_MP } from "../../../assets/utils";
import axios from "axios";
import Loading from "../../Loading/Loader";
import { db } from "../../../database/firebaseConfig";
import { doc, getDoc, updateDoc } from "../../../database/firebaseConfig";
const BASE_ROUTE = process.env.REACT_APP_BASE_ROUTE;
const CRIAR_CONTRATO = process.env.REACT_APP_CRIAR_CONTRATO;
const GERAR_PIX = process.env.REACT_APP_GERAR_PIX;

export default function Modal({ modalData, handleModalCompra, handleOpenPopUp, setPopUpMessage, reloadUserData }) {
    const [assinatura, setAssinatura] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [dolarValue, setDolarValue] = useState(5.30);
    const { userData } = useContext(AuthContext);
    const [paymentMethod, setPaymentMethod] = useState('PIX'); // Estado para método de pagamento
    const [lastId, setLastId] = useState(null)

    const fetchDolarValue = async () => {
        const docRef = doc(db, "SYSTEM_VARIABLES", "TOKEN");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const dolar = docSnap.data().DOLAR;
            if (dolar) {
                setDolarValue(dolar); // Atualiza o valor do dólar
            }
        } else {
            console.log("Documento não encontrado!");
        }
    };

    const fetchLastId = async () => {
        const docRef = doc(db, "SYSTEM_VARIABLES", "CONTRATOID");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            const lastIdDoc = docSnap.data().VALOR;
            if (lastIdDoc) {
                setLastId(parseFloat(lastIdDoc)); // Atualiza o valor do dólar
            }

        } else {
            console.log("Documento não encontrado!");
        }
    };

    const updateLastDoc = async () => {
        const docRef = doc(db, "SYSTEM_VARIABLES", "CONTRATOID");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const lastDocId = docSnap.data().VALOR;
            const newValue = (parseInt(lastDocId) + 1).toString();
            await updateDoc(docRef, { VALOR: newValue });

            console.log("VALOR atualizado para:", newValue);
        } else {
            console.log("O documento não existe.");
        }
    }

    // UseEffect para buscar o valor do dólar quando o componente for montado
    useEffect(() => {
        fetchDolarValue();
        fetchLastId();

    }, []);


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

            if ((parseFloat(modalData.valorPorContrato) * parseFloat(modalData.qttContratos)) > userData.TOTAL_INDICACAO && paymentMethod === "INDICACAO") {
                setLoading(false)
                alert("VOCÊ NÃO TEM DINHEIRO DE INDICAÇÃO O SUFICIENTE");
                return;
            }

            const mp_data_pix = {
                // transaction_amount: parseFloat(((parseFloat(modalData.valorPorContrato) * parseFloat(modalData.qttContratos)) * dolarValue).toFixed(2)),
                transaction_amount: parseFloat(((parseFloat(modalData.valorPorContrato) * parseFloat(modalData.qttContratos))).toFixed(2)),

                description: `Compra de ${modalData.qttContratos} para ${userData.CPF}`,
                paymentMethodId: paymentMethod.toLowerCase(), // Use o valor do estado paymentMethod
                email: userData.EMAIL,
                identificationType: "CPF",
                number: '075.411.521-61'
            }

            const separeted_name = separarNome(userData.NAME);

            const mp_data_boleto = {
                transaction_amount: parseFloat(((parseFloat(modalData.valorPorContrato) * parseFloat(modalData.qttContratos)))),
                // transaction_amount: parseFloat(((parseFloat(modalData.valorPorContrato) * parseFloat(modalData.qttContratos)) * dolarValue).toFixed(2)),
                description: `Compra de ${modalData.qttContratos} para ${userData.CPF}`,
                paymentMethodId: paymentMethod.toLowerCase(), // Use o valor do estado paymentMethod
                email: userData.EMAIL,
                first_name: separeted_name[0],
                last_name: separeted_name[1],
                identificationType: "CPF",
                number: '075.411.521-61'
            }

            var ticket = null;
            var indicacao = false;

            switch (paymentMethod) {
                case "PIX":
                    ticket = await handlePostPIX(mp_data_pix);
                    break;
                case "DEPOSITO":
                    break;
                case "BOLETO":
                    ticket = await handlePostBOLETO(mp_data_boleto)
                    break;
                case "INDICACAO":
                    indicacao = true;
                    break;
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
                    IDCOMPRA: lastId ? (lastId + 1).toString() : gerarStringAleatoria(),
                    MAXIMUMNUMBEROFDAYSTOYIELD: "36",
                    MAXIMUMQUOTAYIELD: "150",
                    RENDIMENTO_ATUAL: 0,
                    INDICACAO: indicacao,
                    PAYMETHOD: paymentMethod,
                    STATUS: 4,
                    TOTALINCOME: "0",
                    TOTALSPENT: (parseFloat(modalData.valorPorContrato) * parseFloat(modalData.qttContratos)),
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
                await updateLastDoc();

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
                    <PDFGenerator ContratoData={modalData} assinatura={assinatura} lastId={lastId+1}/>
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
                        <option value="INDICACAO">SALDO DE INDICAÇÃO</option>
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
