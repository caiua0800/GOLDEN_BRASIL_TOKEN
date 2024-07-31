import React, { useEffect, useState } from 'react';
import * as P from './PopUpStyle';

export default function PopUp({ message, closePopUp }) {
    const [visible, setVisible] = useState(true);

    // useEffect(() => {

    //     setTimeout(() => {
    //         setVisible(false);

    //     }, 5000);

    // }, [])

    const handleClosePopUp = () => {
        closePopUp()
    }

    return (

        <>
            <P.PopUpContainer>
                <P.PopUpContent>
                    <P.CloseButton onClick={handleClosePopUp}>×</P.CloseButton>
                    <p>{message}</p>
                </P.PopUpContent>
            </P.PopUpContainer>

        </>


    );
}
