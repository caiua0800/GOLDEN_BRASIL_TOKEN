import React, { useState, useEffect, useContext } from 'react';
import { FaPencilAlt, FaCheck } from 'react-icons/fa';
import * as U from './UserPageStyle';
import assets from '../../assets/assets';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { mapFieldNameToFirebase } from '../../assets/utils';
import { db, storage, doc, updateDoc } from '../../database/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { usePulse } from '../../context/LoadContext';


const ProfilePage = ({ setProfilePage }) => {
    const { userData, logout, reloadUserData } = useContext(AuthContext);
    const { showPulse, hidePulse } = usePulse();
    const [inputsEnabled, setInputsEnabled] = useState({
        nome: false,
        usuario: false,
        email: false,
        contato: false,
        endereco: false,
        bairro: false,
        cep: false,
        cidade: false,
        estado: false,
    });

    const [inputIcons, setInputIcons] = useState({
        nome: <FaPencilAlt />,
        usuario: <FaPencilAlt />,
        email: <FaPencilAlt />,
        contato: <FaPencilAlt />,
        endereco: <FaPencilAlt />,
        bairro: <FaPencilAlt />,
        cep: <FaPencilAlt />,
        cidade: <FaPencilAlt />,
        estado: <FaPencilAlt />,
    });

    const [inputValues, setInputValues] = useState({
        nome: "",
        usuario: "",
        email: "",
        contato: "",
        endereco: "",
        bairro: "",
        cep: "",
        cidade: "",
        estado: "",
    });

    useEffect(() => {
        if (userData) {
            setInputValues({
                nome: userData.NAME || "",
                usuario: userData.USERNAME || "",
                email: userData.EMAIL || "",
                contato: userData.CONTACT || "indefinido",
                endereco: userData.ADRESS || "",
                bairro: userData.NEIGHBORHOOD || "",
                cep: userData.POSTALCODE || "",
                cidade: userData.CITY || "",
                estado: userData.STATE || "",
            });
        }
    }, [userData]);

    const toggleInput = async (inputName) => {
        if (inputsEnabled[inputName]) {
            try {
                const firebaseFieldName = mapFieldNameToFirebase(inputName);
                const response = await axios.post('http://localhost:4000/clientes/editarInfoClient', {
                    docId: userData.CPF,
                    field: firebaseFieldName,
                    newValue: inputValues[inputName]
                });
                reloadUserData()
                console.log('Campo atualizado:', response.data);
            } catch (error) {
                console.error('Erro ao atualizar campo:', error);
            }
        }

        setInputsEnabled(prev => ({
            ...prev,
            [inputName]: !prev[inputName],
        }));
        setInputIcons(prev => ({
            ...prev,
            [inputName]: !inputsEnabled[inputName] ? <FaCheck /> : <FaPencilAlt />,
        }));
    };

    const handleInputChange = (inputName, value) => {
        setInputValues(prev => ({
            ...prev,
            [inputName]: value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log('Arquivo selecionado:', file);
        showPulse();
        if (file) {
            const userFolder = userData.CPF;
            const storageRef = ref(storage, `users/${userFolder}/${file.name}`);

            uploadBytes(storageRef, file)
                .then(() => getDownloadURL(storageRef))
                .then((downloadURL) => {
                    // Atualiza a URL da foto no backend
                    axios.post('http://localhost:4000/clientes/editarInfoClient', {
                        docId: userData.CPF,
                        field: 'URLFOTOPERFIL',
                        newValue: downloadURL
                    })
                        .then(() => {
                            return axios.post('http://localhost:4000/clientes/editarInfoClient', {
                                docId: userData.CPF,
                                field: 'CONTEMFOTOPERFIL',
                                newValue: true
                            });
                        })
                        .then(() => {
                            setInputValues(prev => ({
                                ...prev,
                                perfilPictureUrl: downloadURL
                            }));
                            hidePulse();
                            reloadUserData();
                            console.log('Foto de perfil atualizada com sucesso!');
                        })
                        .catch(error => {
                            hidePulse();
                            console.error('Erro ao atualizar informações do cliente:', error);
                        });
                })
                .catch(error => {
                    hidePulse();
                    console.error('Erro ao fazer upload da foto:', error);
                });
        }
    };




    const handleLogout = () => {
        logout();
    }

    const handleGetBack = () => {
        setProfilePage(false);
    }

    return (
        <U.Container>
            <U.BackIcon onClick={handleGetBack} />
            <U.ProfileCard>
                <U.InitialContent>
                    <U.ProfilePicture>
                        <img src={(userData && userData.CONTEMFOTOPERFIL) ? userData.URLFOTOPERFIL : assets.user} alt="Profile Picture" />
                        <U.ChangePhotoOverlay>
                            <U.ChangePhotoText>Mude a foto</U.ChangePhotoText>
                            <U.FileInput type="file" onChange={handleFileChange} />
                        </U.ChangePhotoOverlay>
                    </U.ProfilePicture>
                    <U.ProfileName>{inputValues.usuario}</U.ProfileName>
                </U.InitialContent>

                <U.ProfileInfo>
                    <h4>Informações do Perfil</h4>
                    <U.Info>
                        {Object.keys(inputValues).map(key => (
                            <U.InfoBox key={key}>
                                <h3>{key.charAt(0).toUpperCase() + key.slice(1)}: </h3>
                                <input
                                    disabled={!inputsEnabled[key]}
                                    value={inputValues[key]}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                />
                                <U.EditIcon onClick={() => toggleInput(key)}>
                                    {inputIcons[key]}
                                </U.EditIcon>
                            </U.InfoBox>
                        ))}
                    </U.Info>
                </U.ProfileInfo>
                <U.LogoutBtn onClick={handleLogout}>SAIR</U.LogoutBtn>
            </U.ProfileCard>
        </U.Container>
    );
};

export default ProfilePage;
