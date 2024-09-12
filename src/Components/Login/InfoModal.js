import React from "react";
import styled from "styled-components";


export default function InfoModal({setCloseInfoModal}) {

    const handleClick = (type) => {
        if (type === 'poremail') {
            window.location.href = '/recover'
        } else if (type === 'porusuario') {
            window.location.href = '/recoverByUsername'
        }
    }

    const handleClose = () => {
        setCloseInfoModal(false);
    }

    return (
        <Modal>
            <ModalContent>
                <FecharButton>
                    <button onClick={handleClose}>FECHAR</button>
                </FecharButton>
                <BackImage>
                    <img src="logo-golden.png" />
                </BackImage>
                <ModalPrincipal>
                    <h1>AVISO</h1>

                    <p>A PLATAFORMA MUDOU, AGORA COM UM NOVO DESIGN, SIMULAÇÕES E VALIDAÇÃO DA CONTA PARA A SUA SEGURANÇA, TE PREVININDO CONTRA GOLPES DE ACORDO COM A LEI Nº 9.613/1998</p>
                </ModalPrincipal>

                <ModalInfoPrincipal>
                    <h1>
                        MUDANÇA NO ACESSO
                    </h1>

                    <p>A nossa segurança sobre as senhas de acesso se tornou mais forte e é crucial que as senhas dos usuários sejam mudadas para a sua segurança e a nossa.</p>
                    <span>Se for seu primeiro acesso após a mudança da plataforma, clique em redefinir senha, e um link para a redefinição será enviado no seu email, ou se não lembrar o email de cadastro, clique em <Linked onClick={() => {
                        handleClick('poremail')
                    }}>esqueci a senha</Linked>  e depois em <Linked onClick={() => {
                        handleClick('porusuario')
                    }}>recuperar pelo nome de usuário</Linked>, e o email será enviado para o email cadastrado.</span>
                </ModalInfoPrincipal>

                <AuxHelp>
                    <h2>SE PRECISAR DE AJUDA, ASSISTA O VÍDEO TUTORIAL DA NOVA PLATAFORMA</h2>

                    <div>
                        <button>QUERO ASSISTIR</button>
                    </div>

                </AuxHelp>
            </ModalContent>
        </Modal>
    )
}

const Modal = styled.div`
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
`;

const ModalContent = styled.div`
    width: 95%;
    height: 90%;
    background-color: white;
    border-radius: 12px;
    box-shadow: 3px 3px 4px rgba(0,0,0,0.4);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 20px 30px;
    position: reelative;
    overflow: auto;

    @media(max-width: 1000px){
        padding: 20px 10px;
    }
`;

const FecharButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    z-index: 111;

    button{
        z-index: 1;
        width: 200px;
        height: 30px;
        cursor: pointer;
    }

    @media(max-width: 1000px){
        button{
            width: 100px;
            border: 0;
            box-shadow: 3px 3px 2px rgba(0,0,0,0.4);
        }
    }
`;

const BackImage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 1;

    img{
        width: 40%;
        opacity: 0.4;
    }

    @media(max-width: 1000px){
        img{
            width: 80%;
            opacity: 0.3;
        }
    }
`;

const ModalPrincipal = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    flex-direction: column;
    z-index: 2;
    box-sizing: border-box;

    h1{
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 0;
        font-size: 52px;
        font-weight: 500;
        color: #ffc300;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.7);
    }

    p{
        padding: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: center;
        font-size: 22px;
        box-sizing: border-box;
    }

    @media(max-width: 1000px){
        h1{
            font-size: 42px;
            text-shadow: 2px 2px 1px rgba(0,0,0,0.7);
        }

        p{
            width: 100%;
            text-align: justify;
            font-size: 22px;
            font-weight: 500;
        }
    }
`;

const ModalInfoPrincipal = styled.div`
    width: 100%;
    margin-top: 40px;
    box-sizing: border-box;
    padding: 20px;
    justify-content: center;
    display: flex;
    z-index: 1;
    flex-direction: column;

    h1{
        text-align: center;
        margin: 0;
        font-size: 38px;
        color: rgba(0,0,0,0.8);
    }

    p{
        text-align: center;
        font-size: 18px;
        font-weight: 600;
    }

    @media(max-width: 1000px){
        span{
            text-align: justify;
            font-size: 18px;
        }
    }

`;

const Linked = styled.a`
    color: rgba(100,0, 240, 1);
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
`;

const AuxHelp = styled.div`
    width: 100%;
    margin-top: 40px;
    box-sizing: border-box;
    padding: 20px;
    justify-content: center;
    display: flex;
    z-index: 1;
    flex-direction: column;

    h2{
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 0;
        text-align: center;
        font-size: 32px;
        font-weight: 500;
        color: #ffc300;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.7);
    }

    div{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 40px;

        button{
            text-align: center;
            width: 300px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            background: linear-gradient(to right, #0c9b18, #6acc1a);
            color: white;
            transition: .3s;
            font-weight: 600;

            &:hover{
                transform: scale(1.1);
                background: linear-gradient(to right, #6acc1a, #0c9b18);
                font-size: 16px;
            }
        }
    }

    @media(max-width: 1000px){
        margin-top: 10px;

        div{
            margin-top: 20px;
        }

        h2{
            text-align: center;
            font-size: 22px;
            font-weight: 500;
            color: #0000;
            text-shadow: 2px 2px 1px rgba(0,0,0,0.7);
        }
    }


`;