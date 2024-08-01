import React, { useState, useEffect, useContext } from "react";
import * as S from './CompraStyle';
import assets from '../../assets/assets';
import Loading from '../Loading/Loader';
import { calculateProfit, formatarMoedaDollar, formatNumber } from "../../assets/utils";
import Modal from "./CompraModal/Modal";
import TabelaDeContratos from "../Tabelas/TabelaContratos";
import { AuthContext } from "../../context/AuthContext";
import SideBarBox from "../Sidebar/SideBarBox";
import { criarContratoDB, gerarStringAleatoria } from "../../database/firebaseService";
import PopUp from "../PopUp/PopUp";
import { usePulse } from '../../context/LoadContext';

export default function Compra() {
    const { userData, reloadUserData } = useContext(AuthContext);
    const [qttContratos, setQttContratos] = useState(1);
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const [simulado, setSimulado] = useState(false);
    const [resultadoSimulacao, setResultadoSimulacao] = useState({});
    const [modalCompra, setModalCompra] = useState(false);
    const [carteiraState, setCarteiraState] = useState(false);
    const [popUpActive, setPopUpActive] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');
    const [popUpType, setPopUpType] = useState('');
    const { showPulse, hidePulse } = usePulse();



    let valorContratoUni = 50;

    const handleIncreaseInputQtt = (tipo) => {
        tipo === '-' ? qttContratos <= 1 ? setQttContratos(1) : setQttContratos(parseInt(qttContratos) - 1) : setQttContratos(parseInt(qttContratos) + 1);
    }

    const handleChangeInput = (e) => {
        const newValue = e.target.value;
        if (/^\d*$/.test(newValue) && (newValue === '' || parseInt(newValue, 10) >= 1)) setQttContratos(newValue);
    };

    const handleSimulate = () => {
        setSimulado(false);

        showPulse()
        setResultadoSimulacao(calculateProfit(36, (qttContratos * valorContratoUni), 150));
        setTimeout(() => {
            hidePulse()
            setSimulado(true);
        }, 1000);
    }

    const handleValueSubmit = (valor) => { if (valor) setQttContratos(parseInt(valor)); }
    const handleModalCompra = () => { setModalCompra(!modalCompra); }
    const handleCarteiraState = () => { setCarteiraState(!carteiraState); }
    const handleImageLoad = () => { hidePulse(); };


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


    const handleNewCompra = async () => {
        if (userData) {
            let compraInfo = {
                COINS: qttContratos,
                COINVALUE: valorContratoUni.toFixed(2),
                IDCOMPRA: gerarStringAleatoria(),
                MAXIMUMNUMBEROFDAYSTOYIELD: "36",
                MAXIMUMQQUOTAYIELD: "150",
                TOTALINCOME: resultadoSimulacao.totalProfit,
                TOTALSPENT: (valorContratoUni * qttContratos).toString(),
            };

            try {
                const response = await criarContratoDB(userData, compraInfo, reloadUserData);
                const type = response.includes('sucesso') ? 'success' : 'error';
                setPopUpMessage(response);  // Defina a mensagem do pop-up
                handleOpenPopUp(type);      // Passe o tipo de mensagem para o pop-up
                handleModalCompra();        // Feche o modal de compra
            } catch (error) {
                console.error("Erro ao adicionar contrato:", error);
                setPopUpMessage('Ocorreu um erro ao processar sua compra. Por favor, tente novamente.');
                handleOpenPopUp('error');
            }
        }
    };



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
                <>
                    {popUpActive && (
                        <PopUp message={popUpMessage} closePopUp={handleClosePopUp} type={popUpType} />
                    )}

                    <S.CompraTitle><h1>Compra de Contratos</h1></S.CompraTitle>

                    <S.CarteiraContainer>
                        <S.CarteiraIcon>
                            <img onClick={handleCarteiraState} src={carteiraState ? assets.carteiraFechada : assets.carteiraAberta} alt="Carteira" />
                        </S.CarteiraIcon>

                        <S.CarteiraInfo isVisible={carteiraState}>
                            <S.CarteiraInfoBox>
                                <h1>SALDO DE DISPONÍVEL</h1>
                                <span>U$ {userData && formatNumber(userData.DISPONIVEL_SAQUE)}</span>
                            </S.CarteiraInfoBox>
                            <S.CarteiraInfoBox>
                                <h1>SALDO PLATAFORMA</h1>
                                <span>U$ {userData && formatNumber(userData.TOTAL_PLATAFORMA)}</span>
                            </S.CarteiraInfoBox>
                            <S.CarteiraInfoBox>
                                <h1>SALDO DE INDICAÇÃO</h1>
                                <span>0</span>
                            </S.CarteiraInfoBox>
                        </S.CarteiraInfo>
                    </S.CarteiraContainer>

                    <S.ValorContrato><p>1 CONTRATO (3 ANOS): <span>U$ {valorContratoUni.toFixed(2)}</span></p></S.ValorContrato>

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
                            <p>U$ <span>{formatNumber(qttContratos * valorContratoUni)}</span></p>
                        </S.CustoSemTaxa>
                    </S.SelecionarQuantidade>

                    <S.SimularCompra>
                        <button onClick={handleSimulate}>SIMULAR COMPRA</button>
                    </S.SimularCompra>

                    <S.Simulacao>
                        {loading && (
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
                                        <span>U$ {simulado && formatNumber(resultadoSimulacao.dailyProfit)}</span>
                                    </S.SimulacaoBox>
                                    <S.SimulacaoBox>
                                        <p>LUCRO TOTAL</p>
                                        <span>U$ {simulado && formatNumber(resultadoSimulacao.totalProfit)}</span>
                                    </S.SimulacaoBox>
                                </S.ResultadoSimulacaoContainer>

                                <S.RealizarCompraBtn>
                                    <button onClick={handleModalCompra}>REALIZAR COMPRA</button>
                                </S.RealizarCompraBtn>
                            </>
                        )}
                        <TabelaDeContratos dados={userData ? userData.CONTRATOS : []} />
                    </S.Simulacao>

                    {modalCompra && (
                        <Modal handleOpenPopUp={handleOpenPopUp} criarCompraDB={handleNewCompra} handleModalCompra={handleModalCompra} modalData={{
                            meses: 36,
                            dias: resultadoSimulacao.totalDays,
                            lucroDiario: resultadoSimulacao.dailyProfit,
                            porcentagemLucro: 150,
                            qttContratos: qttContratos,
                            valorPorContrato: valorContratoUni,
                            lucroTotal: resultadoSimulacao.totalProfit
                        }} />
                    )}
                </>
            </S.CompraContainer>
        </SideBarBox>

    );
}
