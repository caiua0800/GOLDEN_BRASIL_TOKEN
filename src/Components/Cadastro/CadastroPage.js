import React, { useState } from "react";
import * as S from './CadastroPageStyle';
import assets from "../../assets/assets";

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
    const [cep, setCep] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    // Função para verificar se todos os campos foram preenchidos e senhas coincidem
    const handleCadastro = () => {
        if (!nome || !cpf || !dataNascimento || !telefone || !pais || !endereco || !bairro || !cidade || !cep || !usuario || !senha || !confirmarSenha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return;
        }
        alert('Cadastro realizado com sucesso!');
    };

    return (
        <S.CadastroContainer>
            <S.GetBackButton onClick={() => {window.location.href='/'}}>Voltar</S.GetBackButton>
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
                    <input type="text" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Sua data de nascimento</h2>
                    <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Sua telefone de contato</h2>
                    <input type="text" placeholder="(00) 99999-9999" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
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
                    <h2>Cidade</h2>
                    <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>CEP</h2>
                    <input type="text" placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
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
