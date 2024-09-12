import React, { useState, useContext, useEffect } from "react";
import * as S from './SaqueStyle';
import assets from "../../assets/assets";
import { formatNumber } from "../../assets/utils";
import Modal from "./SaqueModal/Modal";
import Loading from "../Loading/Loader";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../database/firebaseConfig"; // Importe a configuração do Firebase
import { doc, getDoc } from 'firebase/firestore';
import SideBarBox from "../Sidebar/SideBarBox";
import { passou365Dias } from "../../assets/utils";
import TabelaDeSaques from "../Tabelas/TabelaSaques";

export default function Saque() {

    const [modalSaque, setModalSaque] = useState(false);
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [diasDeSaque, setDiasDeSaque] = useState([]);
    const [mostrarBotaoSaque, setMostrarBotaoSaque] = useState(true);
    const { userData } = useContext(AuthContext);

    const handleModalSaque = () => {

        if (!mostrarBotaoSaque) {
            alert("Saque indisponível");
            return;
        }

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


    const handleClickPromotion = () => {
        const phoneNumber = '17992562727';
        const message = 'Olá, gostaria de investir meu lucro em contratos!'; // Mensagem que será enviada (opcional)
        
        // URL para abrir o WhatsApp
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Abre o WhatsApp em uma nova aba
        window.open(whatsappURL, '_blank');
    };
    

    return (
        <SideBarBox>
            <S.SaqueContainer>
                <S.LoginBehind src='logo-golden.png' />
                {loading ? (
                    <Loading />
                ) : (
                    <S.PrincipalContent>
                        <S.SaqueTitle>
                            <h1>Saque</h1>
                        </S.SaqueTitle>

                        <S.SaqueBox>
                            <S.WalletIcon>
                                <img src='wallet.png' />
                            </S.WalletIcon>
                            <S.SaqueBoxTitle></S.SaqueBoxTitle>
                        </S.SaqueBox>

                        <S.CentralizeWallet>
                            <S.WalletValues>
                                <S.WalletValue>
                                    <h2>SALDO PLATAFORMA</h2>
                                    <h6>(lucro + indicação)</h6>
                                    <span>R$ {userData && (userData.TOTAL_PLATAFORMA ? formatNumber(userData.TOTAL_PLATAFORMA - userData.VALOR_SACADO) : 0)}</span>
                                </S.WalletValue>
                                <S.WalletValue>
                                    <h2>SALDO DISPONÍVEL</h2>
                                    <h6>(lucro)</h6>
                                    <span>R$ {userData && (userData.DISPONIVEL_SAQUE ? formatNumber(userData.DISPONIVEL_SAQUE) : 0)}</span>
                                </S.WalletValue>
                                {/* <S.WalletValue>
                                    <h2>SALDO DE INDICAÇÃO</h2>
                                    <span>R$ {userData && (userData.TOTAL_INDICACAO ? formatNumber(userData.TOTAL_INDICACAO) : formatNumber(0))}</span>
                                </S.WalletValue>
                                <S.WalletValue>
                                    <h2>LUCRO RECEBIDO</h2>
                                    <span>R$ {userData && (userData.LUCRO_CONTRATOS ? formatNumber(userData.LUCRO_CONTRATOS) : 0)}</span>
                                </S.WalletValue>
                                <S.WalletValue>
                                    <h2>LUCRO À RECEBER</h2>
                                    <span>R$ {userData && (userData.VALOR_A_RECEBER ? formatNumber(userData.VALOR_A_RECEBER) : 0)}</span>
                                </S.WalletValue> */}
                                {userData.DISPONIVEL_SAQUE > 0 && (
                                    <S.NaoSaque>
                                        <button onClick={handleClickPromotion}>Parabéns! você tem um bônus especial para comprar contratos de minérios com seu saldo sem taxa de saque! clique aqui.</button>
                                    </S.NaoSaque>
                                )}
                                <S.RealizarSaqueBtn>
                                    <button onClick={handleModalSaque}>REALIZAR SAQUE</button>
                                </S.RealizarSaqueBtn>

                                <S.InformacoesSobreSaque>
                                    <p>
                                        As solicitações de saques são feitas no <span>a cada 3 meses </span>
                                        da primeira valorização de cada compra, nessa data se abrirá
                                        uma janela de solicitação saque por <span>48 horas</span> onde o USUÁRIO
                                        definirá se efetua a solicitação de saque ou não, para concluir
                                        a solicitação da compra você deve ter acumulado <span>R$ 150,00.</span>
                                        Os pagamentos das solicitações feitas serão efetuadas a partir
                                        do  <span>dia 01 do mês subsequente</span>, caso não seja dia útil será efetuado
                                        nos próximos dias úteis subsequentes.
                                    </p>
                                </S.InformacoesSobreSaque>
                            </S.WalletValues>
                        </S.CentralizeWallet>
                        {modalSaque && (
                            <Modal handleModalSaque={handleModalSaque} />
                        )}
                    </S.PrincipalContent>
                )}

                <S.TabelaDeSaquesTitle>SAQUES FEITOS</S.TabelaDeSaquesTitle>

                <TabelaDeSaques />
            </S.SaqueContainer>
        </SideBarBox>
    );
}
