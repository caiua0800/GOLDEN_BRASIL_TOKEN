import React, { useState, useEffect, useContext } from 'react';
import { FaPencilAlt, FaCheck } from 'react-icons/fa';
import * as U from './UserPageStyle';
import assets from '../../assets/assets';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { mapFieldNameToFirebase } from '../../assets/utils';
import { usePulse } from '../../context/LoadContext';
import { db, storage, doc, updateDoc } from '../../database/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const BASE_ROUTE = process.env.REACT_APP_BASE_ROUTE;
const EDITAR_CLIENTE_INFO = process.env.REACT_APP_EDITAR_CLIENTE_INFO;
const REACT_APP_EDITAR_CLIENTE_MAIS_CAMPOS_INFO = process.env.REACT_APP_EDITAR_CLIENTE_MAIS_CAMPOS_INFO;

const ProfilePage = ({ setProfilePage }) => {
    const { userData, logout, reloadUserData } = useContext(AuthContext);
    const { showPulse, hidePulse } = usePulse();
    const [inputsEnabled, setInputsEnabled] = useState({
        nome: false,
        usuario: false,
        email: false,
        profissao: false,
        contato: false,
        endereco: false,
        bairro: false,
        cep: false,
        cidade: false,
        estado: false,
        agency: false,
        account: false,
        beneficiario: false,
        bank: false,
        keyPix: false,
        accountType: false,
    });
    const [accountInputEnebled, setAccountInputEnebled] = useState(true)

    const handleAccountInputEneble = () => {
        setInputsEnabled({
            agency: true,
            account: true,
            beneficiario: true,
            keyPix: true,
            bank: true,
            accountType: true,
        })
        setAccountInputEnebled(false)
    }

    const handleAccountInputDisable = () => {
        setInputsEnabled({
            agency: false,
            account: false,
            beneficiario: false,
            keyPix: false,
            bank: false,
            accountType: false,
        })
        setAccountInputEnebled(true)
        handleAccountInfoSave();
    }



    const [inputIcons, setInputIcons] = useState({
        nome: <FaPencilAlt />,
        // usuario: <FaPencilAlt />,
        // email: <FaPencilAlt />,
        contato: <FaPencilAlt />,
        endereco: <FaPencilAlt />,
        bairro: <FaPencilAlt />,
        profissao: <FaPencilAlt />,
        cep: <FaPencilAlt />,
        cidade: <FaPencilAlt />,
        estado: <FaPencilAlt />,
        agency: <FaPencilAlt />,
        account: <FaPencilAlt />,
        bank: <FaPencilAlt />,
        beneficiario: <FaPencilAlt />,
        keyPix: <FaPencilAlt />,
        accountType: <FaPencilAlt />,
    });

    const [inputValues, setInputValues] = useState({
        nome: "",
        usuario: "",
        email: "",
        contato: "",
        endereco: "",
        profissao: "",
        bairro: "",
        cep: "",
        cidade: "",
        estado: "",
        agency: "",
        bank: "",
        account: "",
        beneficiario: "",
        keyPix: "",
        accountType: "",
    });

    const [activeTab, setActiveTab] = useState('profile'); 

    useEffect(() => {
        if (userData) {
            setInputValues({
                nome: userData.NAME || "",
                usuario: userData.USERNAME || "",
                email: userData.EMAIL || "",
                contato: userData.CONTACT || "indefinido",
                endereco: userData.ADRESS || "",
                profissao: userData.JOBTITLE || "",
                bairro: userData.NEIGHBORHOOD || "",
                cep: userData.POSTALCODE || "",
                cidade: userData.CITY || "",
                agency: userData.AGENCY || "",
                bank: userData.BANK || "",
                account: userData.ACCOUNT || "",
                beneficiario: userData.BENEFICIARIO || "",
                keyPix: userData.KEYPIX || "",
                accountType: userData.ACCOUNTTYPE || "",
            });
        }
    }, [userData]);

    const toggleInput = async (inputName) => {

        if (inputsEnabled[inputName]) {
            try {
                showPulse()
                const firebaseFieldName = mapFieldNameToFirebase(inputName);
                const response = await axios.post(`${BASE_ROUTE}${EDITAR_CLIENTE_INFO}`, {
                    docId: userData.CPF,
                    field: firebaseFieldName,
                    newValue: inputValues[inputName]
                });
                reloadUserData();
                console.log('Campo atualizado:', response.data);
                hidePulse()
            } catch (error) {
                console.error('Erro ao atualizar campo:', error);
                hidePulse()

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

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        console.log('Arquivo selecionado:', file);
        showPulse();
        if (file) {
            const userFolder = userData.CPF;
            const storageRef = ref(storage, `users/${userFolder}/${file.name}`);

            uploadBytes(storageRef, file)
                .then(() => getDownloadURL(storageRef))
                .then((downloadURL) => {
                    axios.post(`${BASE_ROUTE}${REACT_APP_EDITAR_CLIENTE_MAIS_CAMPOS_INFO}`, {
                        docId: userData.CPF,
                        updates: [
                            {field: "URLFOTOPERFIL", fieldNewValue: downloadURL},
                            {field: "CONTEMFOTOPERFIL", fieldNewValue: true}
                        ]
                    }).then(res => {
                        console.log(res);
                        hidePulse();
                        reloadUserData();
                    }).catch(err => {
                        console.log(err);
                        hidePulse();
                        reloadUserData();
                    })
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

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    }

    const handleAccountInfoSave = async () => {
        if (inputValues["agency"] != userData.AGENCY ||
            inputValues["account"] != userData.ACCOUNT ||
            inputValues["keyPix"] != userData.KEYPIX ||
            inputValues["accountType"] != userData.ACCOUNTTYPE
        ) {
            const response = await axios.post(`${BASE_ROUTE}${REACT_APP_EDITAR_CLIENTE_MAIS_CAMPOS_INFO}`, {
                docId: userData.CPF,
                updates: [
                    {
                        field: "AGENCY",
                        fieldNewValue: inputValues["agency"]
                    },
                    {
                        field: "ACCOUNT",
                        fieldNewValue: inputValues["account"]
                    },
                    {
                        field: "KEYPIX",
                        fieldNewValue: inputValues["keyPix"]
                    },
                    {
                        field: "ACCOUNTTYPE",
                        fieldNewValue: inputValues["accountType"]
                    }
                    ,
                    {
                        field: "BANK",
                        fieldNewValue: inputValues["bank"]
                    }
                ]
            })

            switch (response.status) {
                case 200:
                    alert(`STATUS ${response.status}: Informações atualizadas`)
                    break;
                case 400:
                    alert(`STATUS ${response.status}: Insira todas as informações`)
                    break;
                case 404:
                    alert(`STATUS ${response.status}: Cliente não encontrado`)
                    break;
                case 500:
                    alert(`STATUS ${response.status}: Erro no servidor`)
                    break;
                default:
                    break;
            }

        }
    }



    return (
        <U.Container>
            <U.BackIcon onClick={handleGetBack} />
            <U.ProfileCard>
                <U.TabContainer>
                    <U.Tab active={activeTab === 'profile'} onClick={() => handleTabChange('profile')}>Informações do Perfil</U.Tab>
                    <U.Tab active={activeTab === 'account'} onClick={() => handleTabChange('account')}>Conta de Recebimento</U.Tab>
                </U.TabContainer>
                {activeTab === 'profile' && (
                    <U.ProfileContent>
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
                                {Object.keys(inputValues)
                                    .filter(key => !['agency', 'account', 'beneficiario', 'keyPix', 'accountType', 'bank'].includes(key))
                                    .map(key => (
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
                    </U.ProfileContent>
                )}
                {activeTab === 'account' && (
                    <U.AccountContent>
                        <h4>Detalhes da Conta de Recebimento</h4>

                        <U.AccountBox>
                            {accountInputEnebled ? (
                                <U.EditHandler onClick={handleAccountInputEneble}>Clique aqui para editar</U.EditHandler>
                            ) : (
                                <U.SaveAccountHandler onClick={handleAccountInputDisable}>SALVAR</U.SaveAccountHandler>
                            )}
                            <U.InfoBox>
                                <h3>Banco:</h3>
                                <input
                                    placeholder='Banco'
                                    disabled={!inputsEnabled["bank"]}
                                    value={inputValues["bank"]}
                                    onChange={(e) => handleInputChange("bank", e.target.value)}
                                />
                            </U.InfoBox>

                            <U.InfoBox>
                                <h3>Agência:</h3>
                                <input
                                    placeholder='Agencia e dígito'
                                    disabled={!inputsEnabled["agency"]}
                                    value={inputValues["agency"]}
                                    onChange={(e) => handleInputChange("agency", e.target.value)}
                                />
                            </U.InfoBox>

                            <U.InfoBox>
                                <h3>Conta:</h3>
                                <input
                                    placeholder='Conta e Dígito'
                                    disabled={!inputsEnabled["account"]}
                                    value={inputValues["account"]}
                                    onChange={(e) => handleInputChange("account", e.target.value)}
                                />

                            </U.InfoBox>

                            <U.InfoBox>
                                <h3>Beneficiário:</h3>
                                <input
                                    placeholder='Nome'
                                    disabled={!inputsEnabled["beneficiario"]}
                                    value={inputValues["beneficiario"]}
                                    onChange={(e) => handleInputChange("beneficiario", e.target.value)}
                                />

                            </U.InfoBox>

                            <U.InfoBox>
                                <h3>Chave Pix:</h3>
                                <input
                                    placeholder='...'
                                    disabled={!inputsEnabled["keyPix"]}
                                    value={inputValues["keyPix"]}
                                    onChange={(e) => handleInputChange("keyPix", e.target.value)}
                                />

                            </U.InfoBox>

                            <U.InfoBox>
                                <h3>Tipo de Conta:</h3>
                                <select
                                    disabled={!inputsEnabled["accountType"]}
                                    value={inputValues["accountType"]}
                                    onChange={(e) => handleInputChange("accountType", e.target.value)}
                                >
                                    <option value="Conta de Pagamento">Conta de Pagamento</option>
                                    <option value="Conta de Recebimento">Conta de Recebimento</option>
                                    <option value="Conta de Poupança">Conta de Poupança</option>
                                    <option value="Conta de Corrente">Conta de Corrente</option>
                                </select>

                            </U.InfoBox>
                        </U.AccountBox>
                    </U.AccountContent>
                )}
                <U.LogoutBtn onClick={handleLogout}>SAIR</U.LogoutBtn>
            </U.ProfileCard>
        </U.Container>
    );
};

export default ProfilePage;
