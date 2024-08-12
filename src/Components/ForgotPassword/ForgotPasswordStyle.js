
import styled from "styled-components";

export const Container = styled.div`
  background-color: #202020;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const GetBack = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    transition: .3s;
    cursor: pointer;
    &:hover{
        transform: scale(0.97);
        color: rgba(255, 255, 255, 1);
    }

`;

export const BoxCenter = styled.div`
    display: flex;
    flex-direction: column;

    h4{
        margin: 0;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 500;
        margin-bottom: 10px;
        font-size: 22px;
    }

    h6{
        margin: 0;
        margin-top: 5px;
        margin-bottom: 10px;
        text-align: end;
        font-weight: 500;
        color: rgba(50, 100, 200, 0.8);
        cursor: pointer;

        &:hover{color: white;}
    }

    input{
        height: 30px;
        font-weight: 500;
    }

    button{
        height: 30px;
        cursor: pointer;
    }

    p{
        margin: 0;
        color: rgba(255, 255, 255, 0.8);

        span{
            margin-left: 10px;
            color: red;
            cursor: pointer;
        }
    }

    @media (max-width: 1000px){

        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        h4{
            text-align: center;
            font-size: 18px;
        }

        input{
            width: 90%;
            height: 30px;
            font-weight: 500;
            box-sizing: border-box;
        }

        button{
            height: 30px;
            cursor: pointer;
            width: 90%;
        }

        p{
            margin: 0;
            color: rgba(255, 255, 255, 0.8);
            box-sizing: border-box;
            text-align: center;
            span{
                margin-left: 10px;
                color: red;
                cursor: pointer;
            }
        }
    }
`;