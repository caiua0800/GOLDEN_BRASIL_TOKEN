import React, { useContext, useState } from "react";
import * as S from './AlterarSenhaStyle';
import { AuthContext } from "../../context/AuthContext";
import SideBarBox from "../Sidebar/SideBarBox";
import { auth } from "../../database/firebaseConfig";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { usePulse } from '../../context/LoadContext';


export default function AlterarSenha() {
    const { userData } = useContext(AuthContext);
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');
    const { showPulse, hidePulse } = usePulse();

    if (!userData) {
        window.location.href = "/";
        return null; // Adicione um return aqui para evitar continuar a execução se userData não estiver presente.
    } else {
        console.log(userData);
    }

    const handleAlterarSenha = async () => {
        if (novaSenha !== confirmarSenha) {
            setError("As senhas não conferem.");
            return;
        }

        showPulse();

        try {
            // Tenta fazer login com a senha atual
            await signInWithEmailAndPassword(auth, userData.EMAIL, senhaAtual);
            const usuario = auth.currentUser;

            // Atualiza a senha do usuário
            if (usuario) {
                await updatePassword(usuario, novaSenha);
                alert("Senha alterada com sucesso!");
                // Limpe os campos
                setSenhaAtual('');
                setNovaSenha('');
                setConfirmarSenha('');
                setError('');
                hidePulse()
            }
        } catch (err) {
            if (err.code === 'auth/wrong-password') {
                setError("A senha atual está incorreta.");
            } else {
                setError("Ocorreu um erro ao alterar a senha.");
            }
            hidePulse()
        }
    };

    return (
        <SideBarBox>
            <S.AlterarSenhaContainer>
                <S.LoginBehind src='logo-golden.png' />

                <S.PrincipalContent>
                    <h1>ALTERAÇÃO DA SENHA</h1>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <S.AlterarContent>
                        <S.InputDiv className="SenhaAtual">
                            <input
                                type="password"
                                placeholder="SENHA ATUAL"
                                value={senhaAtual}
                                onChange={(e) => setSenhaAtual(e.target.value)}
                            />
                        </S.InputDiv>

                        <S.InputDiv className="NovaSenha">
                            <input
                                type="password"
                                placeholder="NOVA SENHA"
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="CONFIRME A SENHA"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                            />
                        </S.InputDiv>

                        <button onClick={handleAlterarSenha}>CONFIRMAR</button>
                    </S.AlterarContent>
                </S.PrincipalContent>
            </S.AlterarSenhaContainer>
        </SideBarBox>
    )
}
