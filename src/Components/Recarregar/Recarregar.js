import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as R from './RecarregarStyle';

export default function Recarregar({ setLoading }) {
    const { reloadUserData } = useContext(AuthContext);
    const [atualizando, setAtualizando] = useState(false);
    const [animationDots, setAnimationDots] = useState('');
    const text1 = 'Requerindo informações atualizadas';
    const text2 = 'Atualizações feitas com sucesso!';
    const [atualizandoText, setAtualizandoText] = useState(text1)

    useEffect(() => {
        if (atualizando) {
            const interval = setInterval(() => {
                setAnimationDots(prev => {
                    if (prev === '...') return '.';
                    return prev + '.';
                });
            }, 500);

            return () => clearInterval(interval);
        }
    }, [atualizando]);

    const handleAtualizar = async () => {
        setAtualizando(true);

        setTimeout(async () => {
            setAtualizando(false);
            setAtualizandoText(text2);
            setLoading(true)
            handleChangeText()
        },2000);
    };

    const handleChangeText = () => {
        setTimeout(async ()=> {
            await reloadUserData();  
            setLoading(false)
            setAtualizandoText(text1);
        },1000);
    }

    return (
        <>
            {!atualizando ? (
                <R.RecarregarBox>
                    <button onClick={handleAtualizar}>Atualizar</button>
                </R.RecarregarBox>
            ) : (
                <R.RecarregarBox>
                    <span>{atualizandoText}{animationDots}</span>
                </R.RecarregarBox>
            )}
        </>
    );
}
