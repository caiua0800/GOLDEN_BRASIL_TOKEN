import React, { useState } from "react";
import * as S from './CadastroPageStyle';
import assets from "../../assets/assets";
import { formatCPF, formatCEP, formatTelefone, removeFormatting } from "../../assets/utils";
import axios from "axios";

const BASE_ROUTE = process.env.REACT_APP_BASE_ROUTE;
const CRIAR_CLIENTE = process.env.REACT_APP_CRIAR_CLIENTE;

export default function CadastroPage() {
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
    const [resposta, setResposta] = useState(''); // Estado para a resposta do servidor

    // Função para verificar se todos os campos foram preenchidos e senhas coincidem
    const handleCadastro = async () => {
        if (!nome || !cpf || !dataNascimento || !telefone || !pais || !endereco || !bairro || !cidade || !cep || !usuario || !senha || !confirmarSenha || !email) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        const clientData = {
            CPF: removeFormatting('cpf', cpf),
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
            setResposta(response.data); // Atualiza o estado com a resposta do servidor
            alert(`Resposta do Servidor: ${response.data}`); // Mostra a resposta em um alerta
        } catch (error) {
            setResposta(`Erro ao criar cadastro: ${error.message}`); // Atualiza o estado com a mensagem de erro
            alert(`Erro ao criar cadastro: ${error.message}`); // Mostra a mensagem de erro em um alerta
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
                    <img src={assets.imageBrandPlatform} alt="Brand Logo" />
                </S.LogoBox>
            </S.CadastroBox>

            <S.CaixaDeCadastro>
                <S.CaixaDeInformacao>
                    <h2>Seu nome Completo</h2>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Seu CPF</h2>
                    <input
                        type="text"
                        placeholder="000.000.000-00"
                        value={cpf}
                        onChange={(e) => setCpf(formatCPF(e.target.value))}
                    />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Sua data de nascimento</h2>
                    <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Sua telefone de contato</h2>
                    <input
                        type="text"
                        placeholder="(00) 99999-9999"
                        value={telefone}
                        onChange={(e) => setTelefone(formatTelefone(e.target.value))}
                    />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>País da atual residência</h2>
                    <input type="text" placeholder="Brasil" value={pais} onChange={(e) => setPais(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Seu endereço e Nº</h2>
                    <input type="text" placeholder="Rua, Nº" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Bairro</h2>
                    <input type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Estado</h2>
                    <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Cidade</h2>
                    <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>CEP</h2>
                    <input
                        type="text"
                        placeholder="00000-000"
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
                    <h2>Crie seu nome de usuário</h2>
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

        </S.CadastroContainer>
    );
}
