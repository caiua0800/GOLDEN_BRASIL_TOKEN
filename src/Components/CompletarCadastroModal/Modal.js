import React, { useState, useEffect, useContext } from "react";
import * as S from './ModalStyle';
import { AuthContext } from "../../context/AuthContext";
import { professions, salarium } from './arrays'; // Importe o array de profissões
import { handleGetNewInfo } from "../../assets/utils";
import { usePulse } from "../../context/LoadContext";

export default function Modal() {
    const { userData, reloadUserData } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [filteredProfessions, setFilteredProfessions] = useState([]);
    const [salario, setSalario] = useState("Selecione");
    const { showPulse, hidePulse } = usePulse();
    const [newName, setNewName] = useState("");
    const [newContact, setNewContact] = useState("");
    const [newAdress, setNewAdress] = useState("");
    const [newNeighborhood, setNewNeighborhood] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newCep, setNewCep] = useState("");
    const [newState, setNewState] = useState("");

    useEffect(() => {
        if (userData && (!userData.JOBTITLE || userData.JOBTITLE.trim() === "")) {
            setShow(true);
        }

        // Preenchendo os campos com os dados do usuário
        setNewName(userData.NAME || "");
        setNewContact(userData.CONTACT || "");
        setNewAdress(userData.ADRESS || "");
        setNewNeighborhood(userData.NEIGHBORHOOD || "");
        setNewCity(userData.CITY || "");
        setNewCep(userData.POSTALCODE || "");
        setNewState(userData.STATE || "");
        setSalario(userData.RENDA_MENSAL || "Selecione")
    }, [userData]);

    useEffect(() => {
        if (inputValue) {
            setFilteredProfessions(professions.filter(profession =>
                profession.toLowerCase().includes(inputValue.toLowerCase())
            ));
        } else {
            setFilteredProfessions([]);
        }
    }, [inputValue]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSelect = (profession) => {
        setInputValue(profession);
    };

    const handleVerifyComplete = async () => {

        
        if (
            inputValue.trim() === "" ||
            salario === "Selecione" ||
            !newName ||
            !newContact ||
            !newAdress ||
            !newNeighborhood ||
            !newCity ||
            !newState ||
            !newCep ||
            !inputValue 
        ) {
            alert("Por favor, preencha todos os campos.");
        } else {
            showPulse();
            var data = {
                docId: userData.CPF,
                updates: [
                    {field: "NAME", fieldNewValue: newName},
                    {field: "CONTACT", fieldNewValue: newContact},
                    {field: "ADRESS", fieldNewValue: newAdress},
                    {field: "NEIGHBORHOOD", fieldNewValue: newNeighborhood},
                    {field: "CITY", fieldNewValue: newCity},
                    {field: "POSTALCODE", fieldNewValue: newCep},
                    {field: "JOBTITLE", fieldNewValue: inputValue},
                    {field: "RENDA_MENSAL", fieldNewValue: salario},
                ]
            }
            await handleGetNewInfo(data, reloadUserData);
            setShow(false);
            alert("Informações atualizadas com sucesso!");
            hidePulse()
        }
    };

    return (
        <>
            {show && (
                <S.ModalContainer>
                    <S.ModalContent>
                        <S.LoginBehind src='logo-golden.png' />

                        <S.PrincipalContent>
                            <h1>COMPLETE SEU CADASTRO</h1>

                            <S.ModalBoxes>
                                <S.JobSelectorDiv>
                                    <p>Qual sua profissão?</p>
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        placeholder="Digite sua profissão"
                                    />
                                    {filteredProfessions.length > 0 && (
                                        <S.ListaProfissoes>
                                            {filteredProfessions.map((profession, index) => (
                                                <li key={index} onClick={() => handleSelect(profession)}>
                                                    {profession}
                                                </li>
                                            ))}
                                        </S.ListaProfissoes>
                                    )}
                                </S.JobSelectorDiv>
                                <S.JobSelectorDiv>
                                    <p>Qual a sua renda mensal aproximada?</p>
                                    <select value={salario} onChange={(e) => setSalario(e.target.value)}>
                                        {salarium && salarium.map((sal, index) => (
                                            <option value={sal} key={index}>{sal}</option>
                                        ))}
                                    </select>
                                </S.JobSelectorDiv>
                            </S.ModalBoxes>

                            <S.ConfirmDataTitle>Confirme seus dados</S.ConfirmDataTitle>
                            <S.ConfirmData>
                                <div>
                                    <span>Nome Completo</span>
                                    <input 
                                        onChange={(e) => setNewName(e.target.value)}
                                        value={newName} // Corrigido para usar newName
                                    />
                                </div>
                                <div>
                                    <span>Contato</span>
                                    <input 
                                        onChange={(e) => setNewContact(e.target.value)}
                                        value={newContact} // Corrigido para usar newContact
                                    />
                                </div>
                                <div>
                                    <span>Endereço</span>
                                    <input 
                                        onChange={(e) => setNewAdress(e.target.value)}
                                        value={newAdress} // Corrigido para usar newAdress
                                    />
                                </div>
                                <div>
                                    <span>Bairro</span>
                                    <input 
                                        onChange={(e) => setNewNeighborhood(e.target.value)}
                                        value={newNeighborhood} // Corrigido para usar newNeighborhood
                                    />
                                </div>
                                <div>
                                    <span>Cidade</span>
                                    <input 
                                        onChange={(e) => setNewCity(e.target.value)}
                                        value={newCity} // Corrigido para usar newCity
                                    />
                                </div>
                                <div>
                                    <span>Estado</span>
                                    <input 
                                        onChange={(e) => setNewState(e.target.value)}
                                        value={newState} // Corrigido para usar newState
                                    />
                                </div>
                                <div>
                                    <span>CEP</span>
                                    <input 
                                        onChange={(e) => setNewCep(e.target.value)}
                                        value={newCep} // Corrigido para usar newCep
                                    />
                                </div>
                            </S.ConfirmData>
                            <S.BotaoSalvarDados onClick={handleVerifyComplete}>SALVAR INFORMAÇÕES</S.BotaoSalvarDados>
                        </S.PrincipalContent>

                    </S.ModalContent>
                </S.ModalContainer>
            )}
        </>
    )
}
