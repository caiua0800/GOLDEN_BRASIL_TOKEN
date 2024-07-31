import styled from "styled-components";


export const RecarregarBox = styled.div`
    width: 100%;
    
    box-sizing: border-box;
    display: flex;
    justify-content: end;

    button{
        margin-right: 20px;
        border: 0;
        background: transparent;
        cursor: pointer;
        transition: .3s;
        font-size: 14px;

        &:hover{
            background: #99d6ea;
            box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
        }
    }

    span{
        font-size: 14px;
    }
`;


