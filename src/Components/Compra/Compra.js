import React, { useState, useEffect, useContext } from "react";
import * as S from './CompraStyle';
import assets from '../../assets/assets';
import Loading from '../Loading/Loader';
import { calculateProfit, formatNumber } from "../../assets/utils";
import Modal from "./CompraModal/Modal";
import TabelaDeContratos from "../Tabelas/TabelaContratos";
import { AuthContext } from "../../context/AuthContext";
import SideBarBox from "../Sidebar/SideBarBox";
import PopUp from "../PopUp/PopUp";
import { usePulse } from '../../context/LoadContext';
import { db } from "../../database/firebaseConfig";
import { getDoc, doc } from "../../database/firebaseConfig";

export default function Compra() {
    const { userData, reloadUserData } = useContext(AuthContext);
    const [qttContratos, setQttContratos] = useState(5);
    const [simulado, setSimulado] = useState(false);
    const [resultadoSimulacao, setResultadoSimulacao] = useState({});
    const [modalCompra, setModalCompra] = useState(false);
    const [carteiraState, setCarteiraState] = useState(false);
    const [popUpActive, setPopUpActive] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');
    const [popUpType, setPopUpType] = useState('');
    const { showPulse, hidePulse } = usePulse();
    const [loadingSimulation, setLoadigSimulation] = useState(false);
    const [valorContratoUni, setValorContratoUni] = useState(0);
    const [minimum, setMinimum] = useState(null);


    useEffect(() => {
        const fetchValorContrato = async () => {
            try {
                const docRef = doc(db, 'SYSTEM_VARIABLES', 'TOKEN');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data && data.TOKEN_VALUE) {
                        setValorContratoUni(data.TOKEN_VALUE);
                        setMinimum(data.MINIMUM);
                        setQttContratos(data.MINIMUM)
                    }
                } else {
                    console.log('Documento não encontrado!');
                }
            } catch (error) {
                console.error('Erro ao buscar o valor do contrato: ', error);
            }
        };

        fetchValorContrato();
    }, []);


    const handleIncreaseInputQtt = (tipo) => {
        tipo === '-' ? qttContratos <= 1 ? setQttContratos(1) : setQttContratos(parseInt(qttContratos) - 1) : setQttContratos(parseInt(qttContratos) + 1);
    }

    const handleChangeInput = (e) => {
        const newValue = e.target.value;
        if (/^\d*$/.test(newValue) && (newValue === '' || parseInt(newValue, 10) >= 1)) setQttContratos(newValue);
    };

    const handleSimulate = () => {

        if(parseFloat(qttContratos) < 5){
            alert("Quantidade mínima de 5 contratos");
            return;
        }
        setSimulado(false);
        setLoadigSimulation(true);

        setResultadoSimulacao(calculateProfit(36, (qttContratos * valorContratoUni), 150));
        setTimeout(() => {
            setSimulado(true);
            setLoadigSimulation(false);

        }, 1000);
    }

    const handleValueSubmit = (valor) => { if (valor) setQttContratos(parseInt(valor)); }

    const handleCarteiraState = () => { setCarteiraState(!carteiraState); }
    const handleImageLoad = () => { hidePulse(); };

    const handleModalCompra = () => {

        // if(!userData.DOCSENVIADOS && !userData.DOCSVERIFICADOS){
        //     alert("ENVIE OS DOCUMENTOS PARA VERIFICAÇÃO");
        //     return;
        // }else if(userData.DOCSENVIADOS && !userData.DOCSVERIFICADOS){
        //     alert("AGUARDE A VERIFICAÇÃO DOS SEUS DOCUMENTOS");
        //     return;
        // }

        setModalCompra(!modalCompra);
    }

    useEffect(() => {
        const imageLoadPromises = [
            new Promise(resolve => {
                const img = new Image();
                img.src = assets.sidebarMenu;
                img.onload = resolve;
            }),
            new Promise(resolve => {
                const img = new Image();
                img.src = assets.carteiraAberta;
                img.onload = resolve;
            }),
            new Promise(resolve => {
                const img = new Image();
                img.src = assets.carteiraFechada;
                img.onload = resolve;
            })
        ];
        Promise.all(imageLoadPromises).then(() => {
            handleImageLoad();
        });
    }, []);


    const handleClosePopUp = () => {
        setPopUpActive(false);
    }

    const handleOpenPopUp = (type) => {
        showPulse();
        setPopUpType(type);

        setTimeout(() => {
            setPopUpActive(true);
            hidePulse();
        }, 1000);
    };

    return (
        <SideBarBox>
            <S.CompraContainer>
                <S.LoginBehind src='logo-golden.png' />

                <S.PrincipalContent>
                    {popUpActive && (
                        <PopUp message={popUpMessage} closePopUp={handleClosePopUp} type={popUpType} />
                    )}

                    <S.CompraTitle><h1>Compra de Contratos</h1></S.CompraTitle>

                    <S.CarteiraContainer>
                        <S.CarteiraIcon>
                            <img onClick={handleCarteiraState} src={carteiraState ? 'wallet.png' : 'wallet-close.png'} alt="Carteira" />
                        </S.CarteiraIcon>

                        <S.CarteiraInfo isVisible={carteiraState}>
                            <S.CarteiraInfoBox>
                                <h1>SALDO DE DISPONÍVEL</h1>
                                <span>R${userData && (userData.DISPONIVEL_SAQUE.toFixed(2))}</span>
                            </S.CarteiraInfoBox>
                            <S.CarteiraInfoBox>
                                <h1>SALDO PLATAFORMA</h1>
                                <span>R$ {userData && formatNumber(userData.TOTAL_PLATAFORMA - userData.VALOR_SACADO)}</span>
                            </S.CarteiraInfoBox>

                        </S.CarteiraInfo>
                    </S.CarteiraContainer>

                    <S.ValorContrato><p>1 CONTRATO (3 ANOS): <span>R$ {valorContratoUni.toFixed(2)}</span></p></S.ValorContrato>

                    <S.SelecionarQuantidade>
                        <h2>Quantos contratos deseja?</h2>

                        <S.InputQtt>
                            <button onClick={() => { handleIncreaseInputQtt('-') }}>-</button>
                            <input onChange={handleChangeInput} value={qttContratos} />
                            <button onClick={() => { handleIncreaseInputQtt('+') }}>+</button>
                        </S.InputQtt>

                        <S.BotoesDeValorBox>
                            <button onClick={() => { handleValueSubmit(100) }}>100</button>
                            <button onClick={() => { handleValueSubmit(500) }}>500</button>
                            <button onClick={() => { handleValueSubmit(1000) }}>1000</button>
                            <button onClick={() => { handleValueSubmit(5000) }}>5000</button>
                            <button onClick={() => { handleValueSubmit(10000) }}>10000</button>
                        </S.BotoesDeValorBox>

                        <S.CustoSemTaxa>
                            <h4>CUSTO DO INVESTIMENTO SEM TAXAS: </h4>
                            <p>R$ <span>{formatNumber(qttContratos * valorContratoUni)}</span></p>
                        </S.CustoSemTaxa>
                    </S.SelecionarQuantidade>

                    <S.SimularCompra>
                        <button onClick={handleSimulate}>SIMULAR COMPRA</button>
                    </S.SimularCompra>

                    <S.Simulacao>
                        {loadingSimulation && (
                            <Loading />
                        )}

                        {simulado && (
                            <>
                                <S.FecharSimulacao>
                                    <span onClick={() => {
                                        setSimulado(false);
                                        setResultadoSimulacao({});
                                    }}>Fechar Simulação</span>
                                </S.FecharSimulacao>

                                <S.ResultadoSimulacaoContainer>
                                    <S.SimulacaoBox>
                                        <p>QTDE. DE DIAS</p>
                                        <span>{simulado && resultadoSimulacao.totalDays}</span>
                                    </S.SimulacaoBox>
                                    <S.SimulacaoBox>
                                        <p>LUCRO DIÁRIO</p>
                                        <span>R$ {simulado && formatNumber(resultadoSimulacao.dailyProfit)}</span>
                                    </S.SimulacaoBox>
                                    <S.SimulacaoBox>
                                        <p>LUCRO TOTAL</p>
                                        <span>R$ {simulado && formatNumber(resultadoSimulacao.totalProfit)}</span>
                                    </S.SimulacaoBox>
                                </S.ResultadoSimulacaoContainer>

                                <S.RealizarCompraBtn>
                                    <button onClick={handleModalCompra}>REALIZAR COMPRA</button>
                                </S.RealizarCompraBtn>
                            </>
                        )}
                        <S.TabelaContratosContainer>
                            <TabelaDeContratos dados={userData ? userData.CONTRATOS : []} />

                        </S.TabelaContratosContainer>
                    </S.Simulacao>

                    {modalCompra && (
                        <Modal handleOpenPopUp={handleOpenPopUp} setPopUpMessage={setPopUpMessage} reloadUserData={reloadUserData} handleModalCompra={handleModalCompra} modalData={{
                            meses: 36,
                            dias: resultadoSimulacao.totalDays,
                            lucroDiario: resultadoSimulacao.dailyProfit,
                            porcentagemLucro: 150,
                            qttContratos: qttContratos,
                            valorPorContrato: valorContratoUni,
                            lucroTotal: resultadoSimulacao.totalProfit
                        }} />
                    )}
                </S.PrincipalContent>
            </S.CompraContainer>
        </SideBarBox>

    );
}
