import React, { useState } from "react";
import * as S from './CadastroPageStyle';
import { formatCPF, formatCEP, formatTelefone, removeFormatting, formatCNPJ, removeFormattingCnpj } from "../../assets/utils";
import axios from "axios";
import MessageBox from "./MessageBox";
import { usePulse } from "../../context/LoadContext";

const BASE_ROUTE = process.env.REACT_APP_BASE_ROUTE;
const CRIAR_CLIENTE = process.env.REACT_APP_CRIAR_CLIENTE;

export default function CadastroPageJuridico() {
    // Estados para os inputs
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [pais, setPais] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');
    const [email, setEmail] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [resposta, setResposta] = useState(null); // Estado para a resposta do servidor
    const { showPulse, hidePulse } = usePulse()


    // Função para verificar se todos os campos foram preenchidos e senhas coincidem
    const handleCadastro = async () => {
        
        if (!nome || !cpf || !dataNascimento || !telefone || !pais || !endereco || !bairro || !cidade || !cep || !usuario || !senha || !confirmarSenha || !email) {
            setResposta({ message: 'Por favor, preencha todos os campos.', type: 'error' });
            return;
        }

        if (senha !== confirmarSenha) {
            setResposta({ message: 'As senhas não coincidem.', type: 'error' });
            return;
        }

        showPulse();

        const clientData = {
            CPF: removeFormattingCnpj('cpf', cpf),
            CNPJ: true,
            ADRESS: endereco.toUpperCase(),
            CITY: cidade.toUpperCase(),
            COUNTRY: pais.toUpperCase(),
            EMAIL: email.toLowerCase(),
            STATE: estado.toUpperCase(),
            POSTALCODE: cep,
            NAME: nome.toUpperCase(),
            NEIGHBORHOOD: bairro,
            PASSWORD: senha,
            USERNAME: usuario,
            CONTACT: removeFormatting('telefone', telefone)
        };

        try {
            const response = await axios.post(`${BASE_ROUTE}${CRIAR_CLIENTE}`, clientData);
            setResposta({ message: response.data.message || 'Usuário criado com sucesso!', type: 'success' });
            hidePulse()
            setTimeout(() => { window.location.href = "/"; }, 2000); // Redireciona após 2 segundos
        } catch (error) {
            hidePulse()
            setResposta({ message: error.response?.data?.error || 'Erro ao criar cadastro. Por favor, tente novamente mais tarde.', type: 'error' });
        }
    };

    return (
        <S.CadastroContainer>
            <S.GetBackButton onClick={() => { window.location.href = '/' }}>Voltar</S.GetBackButton>
            <S.CadastroBox>
                <S.CadastroTitle>
                    Seja bem vindo(a) a Golden Brasil
                </S.CadastroTitle>
                <S.LogoBox>
                    <img src='logo-golden.png' alt="Brand Logo" />
                </S.LogoBox>
            </S.CadastroBox>

            <S.CaixaDeCadastro>
                <S.CaixaDeInformacao>
                    <h2>Razão Social</h2>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Seu CNPJ</h2>
                    <input
                        type="text"
 
                        value={cpf}
                        onChange={(e) => setCpf(formatCNPJ(e.target.value))}
                    />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Data De Criação CNPJ</h2>
                    <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Telefone de Contato</h2>
                    <input
                        type="text"
        
                        value={telefone}
                        onChange={(e) => setTelefone(formatTelefone(e.target.value))}
                    />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>País</h2>
                    <input type="text" value={pais} onChange={(e) => setPais(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Endereço e Nº</h2>
                    <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Bairro</h2>
                    <input type="text"  value={bairro} onChange={(e) => setBairro(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Estado</h2>
                    <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Cidade</h2>
                    <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>CEP</h2>
                    <input
                        type="text"
                        value={cep}
                        onChange={(e) => setCep(formatCEP(e.target.value))}
                    />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>EMAIL</h2>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacaoLogin>
                    <h2>Nome de Usuário</h2>
                    <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                </S.CaixaDeInformacaoLogin>

                <S.CaixaDeEscolherSenha>
                    <div>
                        <span>Crie uma senha</span>
                        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </div>
                    <div>
                        <span>Confirme a senha</span>
                        <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                    </div>
                </S.CaixaDeEscolherSenha>

                <S.CriarCadastro>
                    <button onClick={handleCadastro}>CRIAR CONTA</button>
                </S.CriarCadastro>
            </S.CaixaDeCadastro>
            {resposta && <MessageBox message={resposta.message} type={resposta.type} />}
        </S.CadastroContainer>
    );
}