import styled from 'styled-components';
import { FaPencilAlt, FaCheck, FaArrowLeft } from 'react-icons/fa';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;

    @media (max-width: 800px) {
        height: 80vh;
        top: 100px;
    }
`;

export const ProfileCard = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    width: 800px;
    padding: 20px;
    position: relative;
`;

export const BackIcon = styled(FaArrowLeft)`
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 20px;
    cursor: pointer;
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
    font-size: 24px;
    margin-bottom: 5px;
`;

export const ProfileInfo = styled.div`
    h4 {
        font-size: 18px;
        margin-bottom: 10px;
    }
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

export const InfoBox = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;

    h3 {
        margin: 0;
        margin-right: 10px;
        font-size: 16px;
        margin-bottom: 0;
        width: 100px;
    }

    input {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding-left: 20px;
        box-sizing: border-box;
        font-size: 16px;
        flex-grow: 1;
        margin-right: 10px;
        height: 35px;
    }
`;

export const EditIcon = styled.div`
    cursor: pointer;
    font-size: 18px;
`;

export const LogoutBtn = styled.button`
    width: 100%;
    height: 35px;
    border: 0;
    background-color: #f44545;
    color: black;
    font-size: 18px;
    cursor: pointer;
    
    &:hover {
        background-color: #f91d1d;
    }
`;


