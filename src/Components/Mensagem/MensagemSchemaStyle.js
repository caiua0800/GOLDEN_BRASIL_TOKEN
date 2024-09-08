import styled, { keyframes, css } from 'styled-components';

const messageTypeStyles = {
    AVISO: css`
        background-color: #c9a227;

        h1{
            color: #eeefa8;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
    `,
    PROMOCAO: css`
        background-color: #99d6ea;
        color: white;
    `,
    ATUALIZACAO: css`
        background-color: #e3e902;
        
        h1{
            color: blue;
        }
    `,
    NOTICIA: css`
        background: linear-gradient(to right, #cca000, #ffc300);
        color: white;
    `,
};

export const MensagemVerBox = styled.div`

    position: fixed;
    bottom: 50px;
    right: 50px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    width: 500px;
    border-radius: 8px;
    padding: 20px 10px 10px 10px;
    box-sizing: border-box;

    z-index: 99999999999;
    
    ${({ messageType }) => messageTypeStyles[messageType]}
    overflow: hidden;
    h1,h6,p{margin: 0;}
    cursor: pointer;
    box-shadow: 3px 3px 5px rgba(0,0,0,0.4);

    h1{
        font-size: 18px;
        width: 100%;
        text-align: start;
        font-weight: 800;
    }

    p{
        width: 100%;
        text-align: start;
        margin-top: 5px;
        font-size: 14px;
        font-weight: 600;
        color: rgba(0,0,0,0.7);
    }

    div{
        margin-top: 20px;
        display: flex;
        width: 100%;
        justify-content: space-between;

        h5{
            margin: 0;
            font-size: 12px;
            font-weight: 500;
            color: black;

        }

        h6{
            transition: .3s;
            cursor: pointer;

            &:hover{
                color: blue;
        
            }
        }
    }



    span{
        position: absolute;
        right: 10px;
        top: 0;
        text-align: end;
        transition: .3s;
        cursor: pointer;
        font-weight: 800;

        &:hover{
            transform: scale(1.1);
        }
    }
    transition: .3s;

    &:hover{
        padding-bottom: 20px;
        transform: scale(1.05);
    }

    @media (max-width: 1000px){
        width: 90%;
        right: 10px;
        bottom: 10px;

        h1{
            font-size: 16px;
        }

        p{
            font-size: 14px;
        }

        div{
            h5{
                font-size: 10px;
            }
        }
    }
`;


