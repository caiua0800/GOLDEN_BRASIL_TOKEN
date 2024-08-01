import React from 'react';
import * as P from './PopUpStyle';

export default function PopUp({ message, closePopUp, type }) {
    const handleClosePopUp = () => {
        closePopUp();
    };

    return (
        <P.PopUpContainer>
            <P.PopUpContent type={type}>
                <P.CloseButton onClick={handleClosePopUp}>×</P.CloseButton>
                <p>{message}</p>
            </P.PopUpContent>
        </P.PopUpContainer>
    );
}
