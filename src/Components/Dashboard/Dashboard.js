import React, { useContext, useState, useEffect } from 'react';
import TabelaDeContratos from '../Tabelas/TabelaContratos';
import TwoBars from '../TwoBars/TwoBars';
import * as D from './DashboardStyle';
import { AuthContext } from '../../context/AuthContext';
import { abreviarNome, formatNumber, ULLT, ULLTNUMBER } from '../../assets/utils';
import GrapthLikeBinance from '../GoldGrapth/GrapthLikeBinance';
import { usePulse } from '../../context/LoadContext';
import SideBarBox from '../Sidebar/SideBarBox';
import { encrypt } from '../../assets/utils';

export default function Dashboard() {
  const { userData, reloadUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { showPulse, hidePulse } = usePulse();

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

  const handleReloadWeb = () => {
    loadUserData();
  }


  const copyLink = () => {
    if (userData?.CPF) {
      const encryptedCPF = encrypt(userData.CPF);
      const link = `https://golden-clients.web.app/cadastroIndicacao?id=${encryptedCPF}`;
      navigator.clipboard.writeText(link).then(
        () => alert('Link copiado para a área de transferência!'),
        (err) => console.error('Falha ao copiar o link: ', err)
      );
    } else {
      alert('CPF do usuário não encontrado.');
    }
  };

  if (loading) return null;

  return (
    <SideBarBox>
      <D.DashboardContainer>
        <D.ContainerTitle>
          <p>DASHBOARD</p>
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
                <span>U$ {userData ? formatNumber(userData.TOTAL_PLATAFORMA - userData.VALOR_SACADO) : '0'}</span>
                <D.SaldoPlataformaDivs>
                  <div>
                    <h3>VALOR INVESTIMENTO</h3>
                    <span>U$ {userData ? formatNumber(userData.TOTAL_SPENT) : '0'}</span>
                  </div>
                  <div>
                    <h3>VALOR LUCRO</h3>
                    <span>U$ {userData ? formatNumber(userData.LUCRO_CONTRATOS) : '0'}</span>
                  </div>
                  <div>
                    <h3>SALDO DE INDICAÇÃO</h3>
                    <span>U$ {userData && userData.TOTAL_INDICACAO ? formatNumber(userData.TOTAL_INDICACAO) : formatNumber(0)}</span>
                  </div>
                </D.SaldoPlataformaDivs>
              </D.SaldoNaPlataforma>
            </D.SaldoCorrente>
          </D.FirstRow>
          <D.SecondRow>
            <h1>DISPONÍVEL PARA SAQUE | U$  {userData ? formatNumber(userData.DISPONIVEL_SAQUE) : '0'}</h1>
            <D.SaldoDisponivelParaSaque>
              <D.ProgressBar>
                <D.ProgressFill percentage={userData ? (ULLTNUMBER(userData.DISPONIVEL_SAQUE, userData.VALOR_SACADO) / parseFloat(userData.TOTAL_PLATAFORMA)) * 100 : 0} />
              </D.ProgressBar>
              <D.PercentageCount>{userData ? ((ULLTNUMBER(userData.DISPONIVEL_SAQUE, userData.VALOR_SACADO) / parseFloat(userData.TOTAL_PLATAFORMA)) * 100).toFixed(2) : 0}%</D.PercentageCount>
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
      </D.DashboardContainer>
    </SideBarBox>
  );
}
