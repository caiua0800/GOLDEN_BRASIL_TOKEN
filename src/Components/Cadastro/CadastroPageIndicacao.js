import React, { useState, useEffect } from "react";
import * as S from './CadastroPageStyleIndicacao';
import { formatCPF, formatCEP, formatTelefone, removeFormatting, decrypt2 } from "../../assets/utils";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { usePulse } from "../../context/LoadContext";

const BASE_ROUTE = process.env.REACT_APP_BASE_ROUTE;
const CRIAR_CLIENTE_INDICACAO = process.env.REACT_APP_CRIAR_CLIENTE_INDICACAO;

export default function CadastroPageIndicacao() {
    const [nome, setNome] = useState('');
    const [indicador, setIndicador] = useState('');
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
    const [resposta, setResposta] = useState('');
    const { showPulse, hidePulse } = usePulse()
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const indicadorParam = queryParams.get('id');
        if (indicadorParam) {
            const fixedParam = indicadorParam.replace(/ /g, '+');
            setIndicador(decrypt2(fixedParam));
        }
    }, [location.search]);


    const handleCadastro = async () => {
        if (!nome || !cpf || !dataNascimento || !telefone || !indicador || !pais || !endereco || !bairro || !cidade || !cep || !usuario || !senha || !confirmarSenha || !email) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        showPulse()

        const data = {
            clientData: {
                CPF: removeFormatting('cpf', cpf),
                INDICADOR: (indicador),
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
            }
        }

        try {
            const response = await axios.post(`${BASE_ROUTE}${CRIAR_CLIENTE_INDICACAO}`, data);
            setResposta(response.data);
            alert(`Resposta do Servidor: ${response.data}`);
            console.log(response.data)
            hidePulse()
            window.location.href = "/"
            console.log(data)
        } catch (error) {
            setResposta(`Erro ao criar cadastro: ${error.response.data}`);
            alert(`Erro ao criar cadastro: ${error.response.data.error}`);
            console.log(data)
            hidePulse()

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
                    <h2>Nome Completo</h2>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>CPF</h2>
                    <input type="text" value={formatCPF(cpf)} onChange={(e) => setCpf(removeFormatting('cpf', e.target.value))} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Data de Nascimento</h2>
                    <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Telefone</h2>
                    <input type="text" value={formatTelefone(telefone)} onChange={(e) => setTelefone(removeFormatting('telefone', e.target.value))} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>País</h2>
                    <input type="text" value={pais} onChange={(e) => setPais(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Endereço</h2>
                    <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Bairro</h2>
                    <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Cidade</h2>
                    <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Estado</h2>
                    <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>CEP</h2>
                    <input type="text" value={formatCEP(cep)} onChange={(e) => setCep(removeFormatting('cep', e.target.value))} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Email</h2>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Nome de Usuário</h2>
                    <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Senha</h2>
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Confirmar Senha</h2>
                    <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CriarCadastro>
                    <button onClick={handleCadastro}>CRIAR CONTA</button>
                </S.CriarCadastro>
            </S.CaixaDeCadastro>
        </S.CadastroContainer>
    );
}
