import React, { useState } from "react";
import * as S from './MensagemSchemaStyle';

export default function MensagemSchema({ data }) {

    const [opened, setOpened] = useState(true);

    const handleVerMaisClick = () => {
        if (data.link) {
            window.open(data.link, '_blank');
        }
    };

    const handleClose = () => {
        setOpened(false)
    }
    https://clientes-golden.web.app/dashboard

    return (
        <>
            {opened && (
                <S.MensagemVerBox
                    messageType={data.tipo}
                >
                    {data.tipo === "IMAGEM" ? (
                        <>

                        </>
                    ) : (
                        <>
                            <span onClick={handleClose}>x</span>
                            <h1>{data.titulo || 'TÍTULO'}</h1>
                            <p>{data.mensagem || 'MENSAGEM'}</p>
                            <div>
                                <h5>{data.data ? data.data : 'dd/mm/aaaa'}</h5>
                                <h6 onClick={handleVerMaisClick}>ver mais</h6>
                            </div>
                        </>
                    )}

                </S.MensagemVerBox>

            )}
        </>

    );
}
