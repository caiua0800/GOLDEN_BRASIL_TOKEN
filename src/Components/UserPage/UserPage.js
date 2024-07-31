import React, { useState, useEffect, useContext } from 'react';
import { FaPencilAlt, FaCheck, FaArrowLeft } from 'react-icons/fa';
import * as U from './UserPageStyle'; 
import assets from '../../assets/assets';
import { AuthContext } from '../../context/AuthContext';


const static_image_profile = 'https://firebasestorage.googleapis.com/v0/b/white-lable-528b0.appspot.com/o/assets%2FPeroWL.png?alt=media&token=4552ff3d-41f4-4715-85b7-1a2b9f7f7e89';

const ProfilePage = () => {
    const { userData, logout } = useContext(AuthContext);

    const [inputsEnabled, setInputsEnabled] = useState({
        usuario: false,
        contato: false,
        endereco: false,
        bairro: false,
        cep: false,
        cidade: false,
        estado: false,
    });

    const [inputIcons, setInputIcons] = useState({
        usuario: <FaPencilAlt />,
        endereco: <FaPencilAlt />,
        bairro: <FaPencilAlt />,
        cep: <FaPencilAlt />,
        cidade: <FaPencilAlt />,
        estado: <FaPencilAlt />,
    });

    const [inputValues, setInputValues] = useState({
        usuario: "",
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
                usuario: userData.NAME || "",
                contato: userData.EMAIL || "",
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

            // try {
            //     await updateUserProfile(userProfile.CPF, {
            //         NAME: inputValues.usuario,
            //         ADRESS: inputValues.endereco,
            //         NEIGHBORHOOD: inputValues.bairro,
            //         POSTALCODE: inputValues.cep,
            //         CITY: inputValues.cidade,
            //         STATE: inputValues.estado,
            //     });
            //     setUserProfile(prev => ({
            //         ...prev,
            //         NAME: inputValues.usuario,
            //         ADRESS: inputValues.endereco,
            //         NEIGHBORHOOD: inputValues.bairro,
            //         POSTALCODE: inputValues.cep,
            //         CITY: inputValues.cidade,
            //         STATE: inputValues.estado,
            //     }));
            // } catch (error) {
            //     console.error("Error updating document: ", error);
            // }
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

    const handleFileChange = async (event) => {
        // const file = event.target.files[0];

        // try {
        //     const downloadURL = await uploadProfilePicture(file, userProfile.CPF);
        //     await updateUserProfile(userProfile.CPF, { PROFILEPICTURE: downloadURL });
        //     setUserProfile(prev => ({
        //         ...prev,
        //         PROFILEPICTURE: downloadURL,
        //     }));
        // } catch (error) {
        //     console.error('Error handling file change:', error);
        // }
    };

    const handleLogout = () => {
        logout();
    }

    return (
        <U.Container>
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
