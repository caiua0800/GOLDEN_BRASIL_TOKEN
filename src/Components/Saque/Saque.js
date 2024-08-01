import React, { useState, useContext, useEffect } from "react";
import * as S from './SaqueStyle';
import { Sidebar } from "../Sidebar/Sidebar";
import assets from "../../assets/assets";
import { formatNumber } from "../../assets/utils";
import Modal from "./SaqueModal/Modal";
import Loading from "../Loading/Loader";
import { AuthContext } from "../../context/AuthContext";

export default function Saque() {
    const [sideBarState, setSideBarState] = useState(false);
    const { userData } = useContext(AuthContext);
    const [modalSaque, setModalSaque] = useState(false);
    const [loading, setLoading] = useState(true); // Estado de carregamento

    const handleSidebar = () => {
        setSideBarState(!sideBarState);
    }

    const handleModalSaque = () => {
        setModalSaque(!modalSaque);
    } 

    // Função para verificar se todas as imagens foram carregadas
    const handleImageLoad = () => {
        setLoading(false); // Define como falso quando todas as imagens forem carregadas
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

    return (
        <S.SaqueContainer>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Sidebar isOpen={sideBarState} />
                    <S.BtnSidebar onClick={handleSidebar}>
                        <img src={assets.sidebarMenu} alt='menu' />
                    </S.BtnSidebar>

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
                            <S.RealizarSaqueBtn>
                                <button onClick={handleModalSaque}>REALIZAR SAQUE</button>
                            </S.RealizarSaqueBtn>
                        </S.WalletValues>
                    </S.CentralizeWallet>

                    {modalSaque && (
                        <Modal handleModalSaque={handleModalSaque} />
                    )}
                </>
            )}
        </S.SaqueContainer>
    );
}
