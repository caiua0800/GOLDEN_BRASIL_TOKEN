import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as R from './RecarregarStyle';
import { usePulse } from '../../context/LoadContext';

export default function Recarregar() {
    const { reloadUserData } = useContext(AuthContext);
    const [atualizando, setAtualizando] = useState(false);
    const [animationDots, setAnimationDots] = useState('');
    const text1 = 'Requerindo informações atualizadas';
    const text2 = 'Atualizações feitas com sucesso!';
    const [atualizandoText, setAtualizandoText] = useState(text1);
    const { showPulse, hidePulse } = usePulse();

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
        showPulse();  // Show the pulse animation

        setTimeout(async () => {
            setAtualizando(false);
            setAtualizandoText(text2);
            hidePulse(); // Hide the pulse animation
            handleChangeText();
        }, 2000);
    };

    const handleChangeText = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        await reloadUserData();
        setAtualizandoText(text1);
    };

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
