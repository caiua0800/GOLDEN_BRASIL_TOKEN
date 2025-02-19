import React, { useContext, useState, useEffect } from 'react';
import TabelaDeContratos from '../Tabelas/TabelaContratos';
import TwoBars from '../TwoBars/TwoBars';
import * as D from './DashboardStyle';
import { AuthContext } from '../../context/AuthContext';
import { abreviarNome, formatNumber, ULLTNUMBER } from '../../assets/utils';
import GrapthLikeBinance from '../GoldGrapth/GrapthLikeBinance';
import { usePulse } from '../../context/LoadContext';
import SideBarBox from '../Sidebar/SideBarBox';
import { encrypt } from '../../assets/utils';
import { db } from '../../database/firebaseConfig';
import { collection, getDocs, doc, getDoc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import MensagemSchema from '../Mensagem/MensagemSchema';
import moment from 'moment/moment';
import assets from '../../assets/assets';
import axios from 'axios';
import TabelaRecompra from '../Tabelas/TabelaRecompra/TabelaRecompra';

const rotaInfoIndicados = process.env.REACT_APP_BASE_ROUTE + process.env.REACT_APP_OBTER_INFO_INDICADOS;

export default function Dashboard() {
  const { userData, reloadUserData, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { showPulse, hidePulse } = usePulse();
  const [messageExists, setMessageExists] = useState(null);
  const [indicados, setIndicados] = useState([]);
  const [filtroContratos, setFiltroContratos] = useState("0");
  const [saldoDeRecompra, setSaldoDeRecompra] = useState(0);
  const [saldoDeRecomprado, setSaldoDeRecomprado] = useState(0);


  const loadUserData = async () => {
    showPulse();
    await reloadUserData();
    hidePulse();
    setLoading(false);
  };

  // useEffect(() => {
  //   if (userData)
  //     updateUserEntries();
  // }, []);

  useEffect(() => {
    if (userData && userData.INDICADOS) {
      if (userData.INDICADOS.length > 0) {
        axios.post(rotaInfoIndicados, { INDICADOS: userData.INDICADOS }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(res => {
          console.log(res.data)
          setIndicados(res.data)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }, [userData])


  useEffect(() => {
    if (userData) {
      setLoading(false);
      setIndicados(userData.INDICADOS)
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

  useEffect(() => {
    const fetchMensagens = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'MENSAGENS'));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const enviarPara = data.ENVIAR_PARA || [];
          enviarPara.forEach((item) => {
            if (item === userData?.USERNAME || item === '*') {
              var msgs = messageExists ? messageExists : [];
              msgs.push(data)
              setMessageExists(msgs);
            }
          });
        });
      } catch (error) {
        console.error("Erro ao buscar mensagens: ", error);
      }
    };
    fetchMensagens();


  }, [userData]);

  const handle0AtNumberString = (numberSting) => {
    if (typeof numberSting === 'string') {
      return parseFloat(numberSting)
    } else {
      return numberSting ? numberSting : 0
    }
  }

  useEffect(() => {
    let saldoDeRecompraAux = 0;
    let saldoDeRecompradoAux = 0;
    const contratosFiltrados = userData.CONTRATOS ? userData.CONTRATOS.filter(contrato => contrato.STATUS === 2) : [];
    saldoDeRecompraAux = userData.CONTRATOS ? contratosFiltrados.reduce((total, contrato) => total + (contrato.TOTALSPENT), 0) : [];
    saldoDeRecompradoAux = contratosFiltrados.reduce((total, contrato) => total + (contrato.SALDO_SACADO_RECOMPRA || 0), 0);
    setSaldoDeRecomprado(saldoDeRecompradoAux);
    setSaldoDeRecompra(saldoDeRecompraAux)
  }, [userData]);

  if (loading) return null;

  return (
    <SideBarBox>
      <D.DashboardContainer>
        <D.LoginBehind src='logo-golden.png' />
        <D.PrincipalContent>
          {messageExists && messageExists.map((it, index) => (
            <MensagemSchema data={it} />
          ))}

          <D.ContainerTitle>

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
                <TwoBars totalSpent={userData ? (userData.TOTAL_SPENT) : 0} totalValue={userData ? ULLTNUMBER(userData.TOTAL_PLATAFORMA) : 0} />
              </D.ContratosAtivos>
              <D.SaldoCorrente>
                <D.SaldoNaPlataforma>
                  <h2>SALDO NA PLATAFORMA</h2>
                  <span>R$ {userData ? formatNumber((userData.TOTAL_PLATAFORMA - userData.VALOR_SACADO + (userData.ACERTARBD ? (userData.ACERTARBD) : 0)) - saldoDeRecompra) : '0'}</span>
                  <D.SaldoPlataformaDivs>
                    <div>
                      <h3>VALOR DE COMPRA</h3>
                      <span>R$ {formatNumber(handle0AtNumberString(userData.TOTAL_SPENT - saldoDeRecompra))}</span>
                    </div>
                    <div>
                      <h3>VALOR  DE LUCRO</h3>
                      <span>R$ {userData ? formatNumber(userData.LUCRO_CONTRATOS - userData.VALOR_SACADO) : '0'}</span>
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
              <h1>SALDO| R$  {userData ? formatNumber((userData.LUCRO_CONTRATOS - userData.VALOR_SACADO)) : 0}</h1>
              {/* <h1>SALDO| R$  {userData ? formatNumber((userData.VALOR_SACADO)) : 0}</h1> */}

              <D.SaldoDisponivelParaSaque>
                <D.ProgressBar>
                  <D.ProgressFill percentage={userData ? (((userData.LUCRO_CONTRATOS + (userData.ACERTARBD ? (userData.ACERTARBD) : 0)) - userData.VALOR_SACADO) / parseFloat(userData.TOTAL_PLATAFORMA)) * 100 : 0} />
                </D.ProgressBar>
                <D.PercentageCount>{
                  userData ? (
                    // Obtém os valores garantindo que não sejam NaN ou undefined
                    (() => {
                      const lucroContratos = Number(userData.LUCRO_CONTRATOS) || 0;
                      const acertarBD = Number(userData.ACERTARBD) || 0;
                      const valorSacado = Number(userData.VALOR_SACADO) || 0;
                      const totalPlataforma = parseFloat(userData.TOTAL_PLATAFORMA) || 1; // Use 1 como default para evitar divisão por zero

                      const percentage = (lucroContratos + acertarBD - valorSacado) / totalPlataforma;

                      // Verifica se o resultado é um número finito
                      return Number.isFinite(percentage) ? (percentage * 100).toFixed(2) : 0;
                    })()
                  ) : (
                    0
                  )}%
                </D.PercentageCount>
              </D.SaldoDisponivelParaSaque>
            </D.SecondRow>
            {/* <D.IndiqueEGanha>
              <p>INDIQUE E GANHE 10% DA PRIMEIRA COMPRA DO INDICADO, <span onClick={copyLink}>COPIAR LINK</span></p>
            </D.IndiqueEGanha> */}

            <D.Justing>

              {(indicados && indicados.length > 0) ? (
                <>
                  <D.WrapIt>
                    <D.IndicadosContainer>
                      <D.TableColumns>
                        <span className='itemColumnName'>STATUS</span>
                        <span className='itemColumnName'>NOME</span>
                        <span className='itemColumnName'>COMISSÃO</span>
                      </D.TableColumns>
                      {indicados && indicados.map(ind => (
                        <D.Indicado>
                          <div className='info'>
                            {ind.ATIVO ? <h6 className='ativo'>Ativo</h6> : <h6 className='inativo'>Inativo</h6>}
                          </div>
                          <div className='info'>
                            <img src={assets.user3} />
                            <span>{ind.NOME_INDICADO || ind.NAME || ""}</span>
                          </div>
                          <div className='info'>
                            {ind.TOTAL ? <h6 className='ativo'>R${formatNumber(ind.TOTAL * 0.10)}</h6> : <h6>R$00,00</h6>}
                          </div>

                        </D.Indicado>
                      ))}
                    </D.IndicadosContainer>
                  </D.WrapIt>


                  <D.GrapthContainer>
                    <GrapthLikeBinance />
                  </D.GrapthContainer>
                </>

              ) : (

                <D.GrapthContainer>
                  <GrapthLikeBinance />
                </D.GrapthContainer>
              )}

            </D.Justing>


            <D.ThirdRow>
              <h2>TABELA DE CONTRATOS</h2>
              <select onChange={(e) => setFiltroContratos(e.target.value)}>
                <option value={0}>EM CONTA</option>
                <option value={1}>RECOMPRADOS</option>
              </select>
            </D.ThirdRow>
            <D.TabelaContainer>
              {filtroContratos === "0" ? (
                <TabelaDeContratos dados={userData ? userData.CONTRATOS : []} />
              ) : (
                <TabelaRecompra dados={userData ? userData.RECOMPRAS : []} />
              )}
            </D.TabelaContainer>
          </D.ContainerContent>
        </D.PrincipalContent>
      </D.DashboardContainer>
    </SideBarBox>
  );
}
