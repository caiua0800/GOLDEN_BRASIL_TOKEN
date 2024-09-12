import React, { useContext, useState, useEffect } from 'react';
import TabelaDeContratos from '../Tabelas/TabelaContratos';
import TwoBars from '../TwoBars/TwoBars';
import * as D from './DashboardStyle';
import { AuthContext } from '../../context/AuthContext';
import { abreviarNome, decrypt, formatNumber, ULLT, ULLTNUMBER } from '../../assets/utils';
import GrapthLikeBinance from '../GoldGrapth/GrapthLikeBinance';
import { usePulse } from '../../context/LoadContext';
import SideBarBox from '../Sidebar/SideBarBox';
import { encrypt } from '../../assets/utils';
import { db } from '../../database/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import MensagemSchema from '../Mensagem/MensagemSchema';
import Modal from '../CompletarCadastroModal/Modal'




export default function Dashboard() {
  const { userData, reloadUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { showPulse, hidePulse } = usePulse();
  const [messageExists, setMessageExists] = useState(null);

  const loadUserData = async () => {
    showPulse();
    await reloadUserData();
    hidePulse();
    setLoading(false);
  };

  useEffect(() => {
    if (userData) {
      setLoading(false);
    } else {
      loadUserData();
    }
  }, [userData, reloadUserData, showPulse, hidePulse]);

  const handleReloadWeb = () => { loadUserData(); }

  const copyLink = () => {
    if (userData?.CPF) {
      const encryptedCPF = encrypt(userData.CPF);
      // Define a base URL
      const baseUrl = 'https://clientes-golden.web.app/';
      // Constrói o link final
      const link = `${baseUrl}cadastroIndicacao?id=${encryptedCPF}`;
      // Cria um elemento de input temporário para copiar o texto
      const tempInput = document.createElement('input');
      tempInput.value = link;
      document.body.appendChild(tempInput);
      tempInput.select();
      try {
        // Tenta copiar o texto
        const successful = document.execCommand('copy');
        const msg = successful ? 'Link copiado para a área de transferência!' : 'Falha ao copiar o link.';
        alert(msg);
      } catch (err) {
        console.error('Erro ao copiar o link: ', err);
        alert('Erro ao copiar o link.');
      }
      // Remove o elemento temporário
      document.body.removeChild(tempInput);
    } else {
      alert('CPF do usuário não encontrado.');
    }
  };

  //quando quiseres uma maçã, não a peças, cultive e a colha, pois se pedires...
  useEffect(() => {
    const fetchMensagens = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'MENSAGENS'));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const enviarPara = data.ENVIAR_PARA || [];
          enviarPara.forEach((item) => {
            if (item.CPF === userData?.CPF || item.CPF === '*') {
              setMessageExists(data);
              console.log(`Mensagem encontrado no documento ${doc.id}:`, data);
            }
          });
        });
      } catch (error) {
        console.error("Erro ao buscar mensagens: ", error);
      }
    };
    fetchMensagens();

    let somaLucro = 0;
    userData.CONTRATOS.forEach(c => {
      console.log(c.IDCOMPRA, c.TOTALSPENT, c.RENDIMENTO_ATUAL)
      somaLucro += c.TOTALSPENT*((c.RENDIMENTO_ATUAL/100) || 0)
    })

    let somaSaque = 0;
    let qttSaques = 0;
    userData.SAQUES.forEach(s => {
      if(s.STATUS === 2){
        console.log(s.VALORSOLICITADO)
        somaSaque += s.VALORSOLICITADO;
        qttSaques++;
      }else if(s.STATUS === 1){
        console.log("Saque Pendente", s.VALORSOLICITADO)
      }
    })

    console.log(`Resultado lucro total: R$${somaLucro}`)
    console.log(`Resultado saque total: R$${somaSaque}`)
    console.log(`Resultado lucro total menos saque total: R$${somaLucro-somaSaque}`)
    console.log(`Quantidade de saques aceitos: ${qttSaques}`)

  }, [userData]);

  const handle0AtNumberString = (numberSting) => {
    if (typeof numberSting === 'string') {
      return parseFloat(numberSting)
    } else {
      return numberSting ? numberSting : 0
    }
  }

  if (loading) return null;

  return (
    <SideBarBox>
      <D.DashboardContainer>
        <D.LoginBehind src='logo-golden.png' />
        {/* <Modal /> */}
        <D.PrincipalContent>
          {messageExists && (
            <MensagemSchema data={messageExists} />
          )
          }
          <D.ContainerTitle>
            {/* <p>DASHBOARD</p> */}
          </D.ContainerTitle>
          <D.SaldacoesUsuario>
            <span>OLÁ {abreviarNome((userData?.NAME || '').toUpperCase())}</span>
          </D.SaldacoesUsuario>
          <D.ReloadWeb><span onClick={handleReloadWeb}>atualizar</span></D.ReloadWeb>
          <D.ContainerContent>
            <D.FirstRow>
              <D.ContratosAtivos>
                <h1>CONTRATOS ATIVOS</h1>
                <span>{userData && userData.TOTAL_COINS}</span>
                <TwoBars totalSpent={userData ? ULLTNUMBER(userData.TOTAL_SPENT, userData.VALOR_SACADO) : 0} totalValue={userData ? ULLTNUMBER(userData.TOTAL_PLATAFORMA, userData.VALOR_SACADO) : 0} />
              </D.ContratosAtivos>
              <D.SaldoCorrente>
                <D.SaldoNaPlataforma>
                  <h2>SALDO NA PLATAFORMA</h2>
                  <span>R$ {userData ? formatNumber(userData.TOTAL_PLATAFORMA - userData.VALOR_SACADO) : '0'}</span>
                  <D.SaldoPlataformaDivs>
                    <div>
                      <h3>VALOR DE COMPRA</h3>
                      <span>R$ {formatNumber(handle0AtNumberString(userData.TOTAL_SPENT))}</span>
                    </div>
                    <div>
                      <h3>VALOR  DE LUCRO</h3>
                      <span>R$ {userData ? formatNumber(userData.LUCRO_CONTRATOS) : '0'}</span>
                    </div>
                    <div>
                      <h3>SALDO DE INDICAÇÃO</h3>
                      <span>R$ {userData && userData.TOTAL_INDICACAO ? formatNumber(userData.TOTAL_INDICACAO) : formatNumber(0)}</span>
                    </div>
                  </D.SaldoPlataformaDivs>
                </D.SaldoNaPlataforma>
              </D.SaldoCorrente>
            </D.FirstRow>
            <D.SecondRow>
              <h1>SALDO DISPONÍVEL| R$  {userData ? formatNumber((userData.LUCRO_CONTRATOS - userData.VALOR_SACADO) < 0 ? (userData.LUCRO_CONTRATOS - userData.VALOR_SACADO)*-1 : (userData.LUCRO_CONTRATOS - userData.VALOR_SACADO)) : '0'}</h1>
              <D.SaldoDisponivelParaSaque>
                <D.ProgressBar>
                  <D.ProgressFill percentage={userData ? ((userData.LUCRO_CONTRATOS - userData.VALOR_SACADO) / parseFloat(userData.TOTAL_PLATAFORMA)) * 100 : 0} />
                </D.ProgressBar>
                <D.PercentageCount>{userData ? (((userData.LUCRO_CONTRATOS - userData.VALOR_SACADO) / parseFloat(userData.TOTAL_PLATAFORMA)) * 100).toFixed(2) : 0}%</D.PercentageCount>
              </D.SaldoDisponivelParaSaque>
            </D.SecondRow>
            <D.IndiqueEGanha>
              <p>INDIQUE E GANHE 10% DA PRIMEIRA COMPRA DO INDICADO, <span onClick={copyLink}>COPIAR LINK</span></p>
            </D.IndiqueEGanha>
            <D.GrapthContainer>
              <GrapthLikeBinance />
            </D.GrapthContainer>
            <D.ThirdRow>
              <h2>TABELA DE CONTRATOS</h2>
            </D.ThirdRow>
            <D.TabelaContainer>
              <TabelaDeContratos dados={userData ? userData.CONTRATOS : []} />
            </D.TabelaContainer>
          </D.ContainerContent>
        </D.PrincipalContent>
      </D.DashboardContainer>
    </SideBarBox>
  );
}
