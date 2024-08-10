import styled from 'styled-components';

export const DashboardContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background: linear-gradient(to right, #d4fcff, #d4fcff, #d4fcff, #d4fcff);

    box-sizing: border-box;
    padding: 50px 30px 200px 30px;
    display: flex;
    flex-direction: column;

    @media (max-width: 1000px){
        flex-direction: column;
        justify-content: center;
        padding: 40px 20px 100px 20px;
    }
`;

export const ContainerTitle = styled.div`
    width: 100%;
    font-size: 28px;
    font-weight: 600;
    color: #000026;
    transition: .5s;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;


    p{
        margin: 0;
    }

    &:hover{
        padding: 0px 0px 0px 10px;
        color: #ffd100;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
    }

    @media (max-width: 1000px){
        p{
            font-size: 28px;
        }
    }
`;


export const SaldacoesUsuario = styled.div` 
    width: 100%;
    margin-top: 20px;

    span{
        color: #1e96fc;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
        font-weight: 600;
        font-size: 22px;
    }

    @media (max-width: 1000px){
        margin-top: 10px;

        span{
            font-size: 18px;
        }
    
    }
`;

export const ContainerContent = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
    @media (max-width: 800px){
        flex-direction: column;
        gap: 20px;
    }
`;

export const FirstRow = styled.div`
    margin-top: 30px;
    width: 100%;   
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    gap: 20px;

    @media (max-width: 800px){
        flex-direction: column;
    }
`;

export const FirstRowBox = styled.div`
    width: 100%;
    height: 350px;
    border-radius: 20px;
    box-shadow: 3px 3px 3px rgba(0,0,0,0.5);
    box-sizing: border-box;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px;
    position: relative;

    h1{
        font-size: 22px;
        margin: 0;
        color: rgba(0,0,0,0.7);
    }

    @media (max-width: 1000px){
        height: max-content;
        h1{
            font-size: 18px;
            color: black;
            font-weight: 500;
            text-shadow: 2px 2px 1px rgba(255, 255, 255, 0.3);
        }
    }

`;

export const ContratosAtivos = styled(FirstRowBox)`

    background: linear-gradient(-60deg, #3d4763, #3288be, #31d0e3);

    span{
        margin-top: 20px;
        font-size: 72px;
        font-weight: 800;
        transition: .3s;
        cursor: pointer;
        
        &:hover{
            color: #EEF5FF;
            text-shadow: 2px 2px 1px rgba(0,0,0,0.3);
        }
    }

    @media (max-width: 1000px){
        span{
            margin-top: 0;
            font-size: 32px;
        }
    }
`;

export const SaldoCorrente = styled(FirstRowBox)`
    // background: linear-gradient(to right, #8AC926, #8AC926);
    background: linear-gradient(-60deg, #3fa34d, #72ce27, #72ce27);

`;

export const SaldoNaPlataforma = styled.div`
    whith: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2{
        margin: 0;
        color: rgba(0,0,0,0.7);
    }

    span{
        margin-top: 10px;
        color: white;
        font-size: 38px;
        text-shadow: 2px 2px 1px rgba(0,0,0,0.4);
        font-weight: 800;
    }

    @media (max-width: 1000px){
        h2{
            margin: 0;
            font-size: 22px;
            font-weight: 500;
            text-shadow: 2px 2px 1px rgba(255, 255, 255, 0.4);
        }

        span{
            margin-top: 0;
            font-size: 26px;
        }
    }
    
`;

export const SaldoPlataformaDivs = styled.div`

    width: 100%;
    display: flex;
    gap: 20px;
    margin-top: 30px;
    justify-content: space-between;

    div{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        h3{
            width: max-content;
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: #1e96fc;
            text-shadow: 1px 1px 1px rgba(0, 0, 0,0.4);
            transition: .3s;

            &:hover{
                color: white;
                transform: scale(1.05);
            }
        }

        span{
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            text-shadow: 2px 2px 1px rgba(0,0,0,0.4);
            color: white;
        }
    }

    @media (max-width: 1000px){
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;

        div{
            h3{
                font-size: 16px;
                color: rgba(10, 70, 255, 1);
            }

            span{
                font-size: 16px;
            }
        }
    }
`;


export const ProgressBar = styled.div`
    position: absolute;
    bottom: 10px;
    left: 20px; 
    right: 20px;
    height: 10px;
    background-color: #ffff; 
    overflow: hidden;
`;

export const ProgressFill = styled.div`
    width: ${props => props.percentage}%;
    height: 100%;
    background-color: rgba(99, 253, 15, 0.8);
    transition: width 4s ease;
`;

export const PercentageCount = styled.div`
    position: absolute;
    bottom: 30px;
    left: 50px;
    color: white;
    cursor: pointer;
    width: 60px;
    text-align: center;
    border-radius: 20px;
    font-weight: 600;
    background-color: rgba(99, 253, 15, 0.8);

    @media (max-width: 1000px){
        width: 60px;
        font-size: 12px;
        color: black;
    }
`;

export const SecondRow = styled.div`
    width: 100%;
    height: max-content;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: 40px;



    h1 {
        text-align: center;
        margin: 0;
        color: #72ce27;
        text-shadow: 2px 2px 2px rgba(0,0,0,0.4)
    }

    @media (max-width: 1000px) {
        flex-direction: column;
        margin-top: 20px;
        h1{
            font-size: 18px;
            text-shadow: 1px 1px 1px rgba(0,0,0,0);
        }
    }
`;

export const SaldoDisponivelParaSaque = styled.div`
    position: relative;
`;

export const IndiqueEGanha = styled.div`
    width: 100%;
    padding: 20px;
    box-shadow: 2px 3px 6px rgba(0,0,0,0.67);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .3s;

    p{
        color: #3288be;
        margin: 0;
        text-align: center;
    }
    span{
        color: #31d0e3;
        cursor: pointer;

        &:hover{
            font-weight: 800;
        }
    }

    &:hover{
        p{
            color: #fff;
        }
        background-color: #3288be;
        transform: scale(1.03);
    }

    @media (max-width: 1000px){
    
    }
`;


export const ThirdRow = styled.div`
    margin-top: 40px;
    text-align: center;
    h2{
        margin: 0;
        font-size: 28px;
        color: #72ce27;
        text-shadow: 2px 2px 1px rgba(0,0,0,0.6);
    }
`;

export const TabelaContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 20px 30px;
    overflow-y: scroll;
    max-height: 400px;

`;

export const GrapthContainer = styled.div`
    height: 450px;
    box-shadow: 3px 3px 4px rgba(0,0,0,0.4);
`;


export const BtnSidebar = styled.button`

    position: fixed;
    top: 50px;
    right: 50px;
    z-index: 9999;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 2px solid black;
    border-radius: 3px;
    cursor: pointer;
    transition: .3s;
    box-shadow: 3px 3px 3px rgba(0,0,0,0.6);
    &:hover{
        transform: scale(1.1);
    }

    img{
        z-index: 9999
        width: 100%;
        height: 100%;
    }
`;