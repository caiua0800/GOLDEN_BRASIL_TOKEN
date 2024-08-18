import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(255, 255, 255, 1);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99999;
    padding: 20px 0;
    box-sizing: border-box;

    @media (max-width: 1000px) {
        height: 100vh;
        top: 0px;
    }
`;



export const ProfileCard = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    width: 800px;   
    overflow-y: auto;
    height: 90vh;
    padding: 20px;
    position: relative;
    box-sizing: border-box;

    @media (max-width: 1000px){
        width: 100%;
        padding: 40px 20px;
        height:  90vh;
        margin-top: 120px;
        border-radius: 0;
    }
`;

export const BackIcon = styled(FaArrowLeft)`
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 38px;
    cursor: pointer;
    transition: .3s;

    &:hover {
        transform: scale(0.95);
    }

    @media (max-width: 1000px){
        z-index: 99999;
        font-size: 28px;
    }

`;

export const TabContainer = styled.div`
    display: flex;
    border-bottom: 2px solid #ddd;
`;

export const Tab = styled.div`
    flex: 1;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    border-bottom: 2px solid ${props => (props.active ? '#007bff' : 'transparent')};
    background-color: ${props => (props.active ? '#f9f9f9' : 'white')};
    transition: background-color 0.3s, border-bottom-color 0.3s;
`;

export const ProfileContent = styled.div`
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;



export const InitialContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

export const ProfilePicture = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 10px;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: filter 0.3s ease;
    }

    &:hover img {
        filter: brightness(70%);
    }
`;

export const ChangePhotoOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    transition: opacity 0.3s ease;

    ${ProfilePicture}:hover & {
        opacity: 1;
    }
`;

export const ChangePhotoText = styled.p`
    margin: 0;
    font-size: 14px;
`;

export const FileInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
`;

export const ProfileName = styled.h2`
    margin: 0;
    font-size: 18px;
    margin-bottom: 5px;
    font-weight: 500;
`;

export const ProfileInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h4 {
        font-size: 18px;
        margin-bottom: 10px;
    }
`;

export const Info = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

export const InfoBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
    justify-content: start;
    align-items: center;
    gap: 5px;
    box-sizing: border-box;
    border: 2px solid rgba(0,0,0,0.1);
    padding-left: 10px;
    padding-right: 10px;
    box-shadow: 3px 3px 2px rgba(0,0,0,0.2); 
    // background-color: rgba(0,0,0,0.2);
    h3{
        font-weight: 500;
    }
    input, select{
        height: 40px;
        flex: 1;
        border: 0;
        box-shadow: 3px 3px 2px rgba(0,0,0,0.2); 
        box-sizing: border-box;
        padding-left: 10px
    }

    @media (max-width: 1000px){
        width: 100%;

        h3{
            font-size: 12px;
        }

        input, select{
            height: 30px;
            flex: 1;
            font-size: 12px;
        }
    }
`;

export const EditIcon = styled.div`
    cursor: pointer;
    margin-left: 10px;
    color: #007bff;
    transition: color 0.3s;

    &:hover {
        color: #0056b3;
    }
`;

export const LogoutBtn = styled.button`
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 20px;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #c82333;
    }
`;


export const AccountContent = styled.div`
    padding: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;

    h4{
        font-weight: 500;
        font-size: 18px;

    }
`;


export const AccountBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const BoxAcccount = styled.div`
    width: 100%;
`;

export const Footer = styled.div`
  margin-top: 20px;
`;

export const SaveButton = styled.button`
  background: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export const EditHandler = styled.span`
    width: 100%;
    display: flex;
    justify-content: end;
    font-size: 12px;
    cursor: pointer;
    color: rgba(10, 26, 240, 0.6);
    font-weight: 500;

    &:hover{
        color: rgba(10, 26, 240, 1);
    }
`;

export const SaveAccountHandler = styled.span`
    width: 100%;
    display: flex;
    justify-content: end;
    font-size: 12px;
    cursor: pointer;
    color: rgba(10, 100, 20, 0.6);
    font-weight: 500;

    &:hover{
        color: rgba(10, 240, 20, 1);
    }
`;

// export const AccountBox = styled.div``;
