import React, { useState, useContext, useEffect } from "react";
import * as S from './SaqueStyle';
import { Sidebar } from "../Sidebar/Sidebar";
import assets from "../../assets/assets";
import { formatNumber } from "../../assets/utils";
import Modal from "./SaqueModal/Modal";
import Loading from "../Loading/Loader";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../database/firebaseConfig"; // Importe a configuração do Firebase
import { doc, getDoc } from 'firebase/firestore';
import SideBarBox from "../Sidebar/SideBarBox";

export default function Saque() {
    const [sideBarState, setSideBarState] = useState(false);
    const [modalSaque, setModalSaque] = useState(false);
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [diasDeSaque, setDiasDeSaque] = useState([]);
    const [mostrarBotaoSaque, setMostrarBotaoSaque] = useState(false);
    const { userData } = useContext(AuthContext);

    const handleSidebar = () => {
        setSideBarState(!sideBarState);
    }

    const handleModalSaque = () => {
        setModalSaque(!modalSaque);
    }

    const handleImageLoad = () => {
        setLoading(false);
    };

    useEffect(() => {
        // Cria uma promessa para verificar o carregamento das imagens
        const imageLoadPromises = [
            new Promise(resolve => {
                const img = new Image();
                img.src = assets.carteiraAberta;
                img.onload = resolve;
            }),
            new Promise(resolve => {
                const img = new Image();
                img.src = assets.sidebarMenu;
                img.onload = resolve;
            })
        ];

        Promise.all(imageLoadPromises).then(() => {
            handleImageLoad(); // Atualiza o estado para mostrar o conteúdo
        });
    }, []);

    useEffect(() => {
        const fetchDiasDeSaque = async () => {
            try {
                const docRef = doc(db, 'SYSTEM_VARIABLES', 'JANELA_DE_SAQUES');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data && Array.isArray(data.DIAS) && data.DIAS.length > 0) {
                        setDiasDeSaque(data.DIAS);
                    }
                } else {
                    console.log('Documento não encontrado!');
                }
            } catch (error) {
                console.error('Erro ao buscar os dias de saque: ', error);
            }
        };

        fetchDiasDeSaque();
    }, []);

    useEffect(() => {
        const hoje = new Date().getDate();
        if (diasDeSaque.includes(hoje)) {
            setMostrarBotaoSaque(true);
        } else {
            setMostrarBotaoSaque(false);
        }
    }, [diasDeSaque]);

    return (
        <SideBarBox>
            <S.SaqueContainer>
                {loading ? (
                    <Loading />
                ) : (
                    <>


                        <S.SaqueTitle>
                            <h1>Saque</h1>
                        </S.SaqueTitle>

                        <S.SaqueBox>
                            <S.WalletIcon>
                                <img src={assets.carteiraAberta} />
                            </S.WalletIcon>
                            <S.SaqueBoxTitle>CARTEIRA</S.SaqueBoxTitle>
                        </S.SaqueBox>

                        <S.CentralizeWallet>
                            <S.WalletValues>
                                <S.WalletValue>
                                    <h2>SALDO PLATAFORMA</h2>
                                    <h6>(investido + lucro + indicação)</h6>
                                    <span>U$ {userData && (userData.TOTAL_PLATAFORMA ? formatNumber(userData.TOTAL_PLATAFORMA) : 0)}</span>
                                </S.WalletValue>
                                <S.WalletValue>
                                    <h2>SALDO DISPONÍVEL</h2>
                                    <h6>(lucro + contr. vencidos)</h6>
                                    <span>U$ {userData && (userData.DISPONIVEL_SAQUE ? formatNumber(userData.DISPONIVEL_SAQUE) : 0)}</span>
                                </S.WalletValue>
                                <S.WalletValue>
                                    <h2>SALDO DE INDICAÇÃO</h2>
                                    <span>U$ {userData && (userData.TOTAL_INDICACAO ? formatNumber(userData.TOTAL_INDICACAO) : formatNumber(0))}</span>
                                </S.WalletValue>
                                <S.WalletValue>
                                    <h2>LUCRO RECEBIDO</h2>
                                    <span>U$ {userData && (userData.LUCRO_CONTRATOS ? formatNumber(userData.LUCRO_CONTRATOS) : 0)}</span>
                                </S.WalletValue>
                                <S.WalletValue>
                                    <h2>LUCRO À RECEBER</h2>
                                    <span>U$ {userData && (userData.VALOR_A_RECEBER ? formatNumber(userData.VALOR_A_RECEBER) : 0)}</span>
                                </S.WalletValue>
                                {diasDeSaque.length > 0 && (
                                    <S.DiasDeSaque>
                                        <h2>DIAS PARA REALIZAR SAQUE</h2>
                                        <div className="diasContainer">
                                            {diasDeSaque.map(dia => (
                                                <S.Dia key={dia}>
                                                    <span>{dia < 10 ? `0${dia}` : dia}</span>
                                                </S.Dia>
                                            ))}
                                        </div>
                                    </S.DiasDeSaque>
                                )}
                                {mostrarBotaoSaque && (
                                    <S.RealizarSaqueBtn>
                                        <button onClick={handleModalSaque}>REALIZAR SAQUE</button>
                                    </S.RealizarSaqueBtn>
                                )}
                            </S.WalletValues>
                        </S.CentralizeWallet>

                        {modalSaque && (
                            <Modal handleModalSaque={handleModalSaque} />
                        )}
                    </>
                )}
            </S.SaqueContainer>
        </SideBarBox>

    );
}
