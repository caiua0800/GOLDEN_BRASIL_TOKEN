import React, { useContext, useState, useEffect } from "react";
import * as V from './ValidacaoStyle';
import Loading from "../Loading/Loader";
import SideBarBox from "../Sidebar/SideBarBox";
import { AuthContext } from "../../context/AuthContext";
import { uploadFile, updateUserDocument } from '../../database/firebaseService';
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_ROUTE
const DESTIN_URL = process.env.REACT_APP_UPDATE_CACHE

export default function Validacao() {
    const { userData, reloadUserData } = useContext(AuthContext);
    const [document, setDocument] = useState(null);
    const [face, setFace] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        setLoadingData(false);
    }, [userData]);

    const handleCaptureDoc = (event) => {
        const file = event.target.files[0];
        setDocument(file);
    };

    const handleCaptureFace = (event) => {
        const file = event.target.files[0];
        setFace(file);
    };

    const handleUpload = async () => {
        if (document && face) {
            setUploading(true);
            try {
                const docURL = await uploadFile(document, userData.CPF, 'document');
                const faceURL = await uploadFile(face, userData.CPF, 'face');

                await updateUserDocument(userData.CPF, {
                    DOCSENVIADOS: true,
                    DOCSVERIFICADOS: false,
                    URL_DOCUMENTO: docURL,
                    URL_FACE: faceURL
                }, reloadUserData);

                setUploadSuccess(true);

                const responseUpdateCache = await axios.get(`${BASE_URL}${DESTIN_URL}`);

                if ((await responseUpdateCache).status == 200) {
                    console.log(responseUpdateCache.data)
                } else {
                    console.log("Erro ao atualizar cache no servidor")
                }
            } catch (error) {
                console.error("Error uploading files and updating user document: ", error);
                alert("Ocorreu um erro ao enviar os documentos. Por favor, tente novamente.");
            } finally {
                setUploading(false);
            }
        } else {
            alert("Por favor, capture tanto o documento quanto o rosto antes de enviar.");
        }
    };

    if (loadingData) {
        return <Loading />;
    }

    return (
        <SideBarBox>
            <V.ValidacaoContainer>

                <V.LoginBehind src='logo-golden.png' />
                <V.PrincipalContent>

                    {uploading && (
                        <Loading />
                    )}

                    <V.ValidacaoCenter>
                        {userData.DOCSENVIADOS && userData.DOCSVERIFICADOS ? (
                            <V.ValidacaoSuccess>
                                <h3>Documentos Verificados!</h3>
                                <p>Seus documentos foram verificados com sucesso.</p>
                            </V.ValidacaoSuccess>
                        ) : userData.DOCSENVIADOS ? (
                            <V.ValidacaoSuccess>
                                <h3>Documentos Enviados!</h3>
                                <p>Seus documentos foram enviados e estão aguardando verificação.</p>
                            </V.ValidacaoSuccess>
                        ) : (
                            <>
                                <V.ValidacaoHeader>
                                    <h3>FAÇA A VALIDAÇÃO DA SUA CONTA PARA PODER REALIZAR SAQUES</h3>
                                    <div>
                                        <span>DOCUMENTOS ACEITOS</span>
                                        <ul>
                                            <li>RG</li>
                                            <li>CNH</li>
                                            <li>PASSAPORTE</li>
                                        </ul>
                                    </div>
                                </V.ValidacaoHeader>
                                <V.ValidacaoUploadFiles>
                                    <V.UploadDocument>
                                        <label htmlFor="docInput">Tire uma foto do documento:</label>
                                        {document && <V.ImagePreview src={URL.createObjectURL(document)} alt="Documento capturado" />}

                                        <input
                                            id="docInput"
                                            type="file"
                                            accept="image/*"
                                            capture="environment"
                                            onChange={handleCaptureDoc}
                                        />
                                    </V.UploadDocument>

                                    <V.UploadFace>
                                        <label htmlFor="faceInput">Tire uma foto do rosto:</label>
                                        {face && <V.ImagePreview src={URL.createObjectURL(face)} alt="Rosto capturado" />}
                                        <input
                                            id="faceInput"
                                            type="file"
                                            accept="image/*"
                                            capture="environment"
                                            onChange={handleCaptureFace}
                                        />
                                    </V.UploadFace>
                                </V.ValidacaoUploadFiles>
                                <V.ValidacaoConfirmation>
                                    <button disabled={uploading || uploadSuccess} onClick={handleUpload}>
                                        {uploading ? "Enviando..." : uploadSuccess ? "Documentos Enviados!" : "ENVIAR DOCUMENTOS"}
                                    </button>
                                </V.ValidacaoConfirmation>
                                <V.ValidacaoFooter>
                                    <span>OS DOCUMENTOS SÃO VALIDADOS EM ATÉ 7 DIAS ÚTEIS<br />TENDO ALGUMA DÚVIDA, ENTRE EM CONTATO</span>
                                </V.ValidacaoFooter>
                            </>
                        )}
                    </V.ValidacaoCenter>
                </V.PrincipalContent>

            </V.ValidacaoContainer>
        </SideBarBox>
    );
}
