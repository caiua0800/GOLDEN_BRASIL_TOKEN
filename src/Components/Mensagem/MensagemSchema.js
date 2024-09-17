import React, { useState } from "react";
import * as S from './MensagemSchemaStyle';
import { format } from 'date-fns';

// Add this function at the top of your file
const formatFirestoreTimestamp = (timestamp) => {
  if (timestamp && typeof timestamp.toDate === 'function') {
    return format(timestamp.toDate(), 'dd/MM/yyyy HH:mm');
  } else if (timestamp && timestamp.seconds) {
    return format(new Date(timestamp.seconds * 1000), 'dd/MM/yyyy HH:mm');
  } else if (timestamp instanceof Date) {
    return format(timestamp, 'dd/MM/yyyy HH:mm');
  } else if (typeof timestamp === 'string') {
    return timestamp;
  }
  return 'Data não disponível';
};


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

    return (
        <>
            {opened && (
                <S.MensagemVerBox
                    messageType={data.tipo}
                >
                    {data.tipo === "IMAGEM" ? (
                        <>
                            <S.ComImagem className="normal">
                                <span onClick={handleClose}>x</span>
                                <h5>{data.data ? formatFirestoreTimestamp(data.data) : 'dd/mm/aaaa'}</h5>
                                <img src={data.imagem} alt="Selecionado" />
                                <h3>{data.mensagem || "Mensagem"}</h3>
                                <h6>Converse Conosco</h6>
                            </S.ComImagem>
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
