import { ref, uploadBytes, getDownloadURL  } from 'firebase/storage';
import { db, storage } from '../database/firebaseConfig';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { format, addYears } from 'date-fns';
import { usePulse } from '../context/LoadContext';

export const uploadFile = async (file, userId, type) => {
    try {
        const storageRef = ref(storage, `users/${userId}/${type}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading file: ", error);
        throw error;
    }
};

export const updateUserDocument = async (userId, updates, reloadUserData) => {
    try {
        const userDocRef = doc(db, 'USERS', userId);
        await updateDoc(userDocRef, updates);
        
        if (reloadUserData) await reloadUserData();
        
    } catch (error) {
        console.error("Error updating user document: ", error);
        throw error;
    }
};

export const criarContratoDB = async (userDataClient, compraInfo, reloadUserData) => {
    try {
        // Verifique se os documentos foram enviados e verificados
        if (!userDataClient.DOCSVERIFICADOS || !userDataClient.DOCSENCIADOS) {
            return 'ENVIE OS DOCUMENTOS PARA ANÁLISE PARA REALIZAR TRANSAÇÕES';
        }

        if (!userDataClient.DOCSVERIFICADOS || !userDataClient.DOCSENCIADOS) {
            return 'AGUARDE A VERIFICAÇÃO DOS DOCUMENTOS PARA REALIZAR TRANSAÇÕES';
        }

        // Cria um contrato no banco de dados
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');

        const yieldTermDate = addYears(currentDate, 3);
        const formattedYieldTermDate = format(yieldTermDate, 'yyyy-MM-dd HH:mm:ss');
        
        const userDocRef = doc(db, 'USERS', userDataClient.CPF);
        await updateDoc(userDocRef, {
            CONTRATOS: arrayUnion({
                COINS: compraInfo.COINS.toString(),
                COINVALUE: compraInfo.COINVALUE,
                IDCOMPRA: compraInfo.IDCOMPRA,
                MAXIMUMNUMBEROFDAYSTOYIELD: compraInfo.MAXIMUMNUMBEROFDAYSTOYIELD,
                MAXIMUMQQUOTAYIELD: compraInfo.MAXIMUMQQUOTAYIELD,
                PURCHASEDATE: formattedDate,
                TOTALINCOME: compraInfo.TOTALINCOME.toString(),
                TOTALSPENT: compraInfo.TOTALSPENT,
                YIELDTERM: formattedYieldTermDate,
                CURRENTINCOME: '0',
                STATUS: 4,
            })
        });

        // Atualiza os dados do usuário
        if (reloadUserData) await reloadUserData();
        
        return 'Contrato adicionado com sucesso!';

    } catch (error) {
        console.error("Erro ao criar contrato: ", error);
        return 'Ocorreu um erro ao processar sua compra. Por favor, tente novamente.';
    }
};


export const gerarStringAleatoria = () => {
    const comprimento = 8;
    return Math.random().toString().slice(2, comprimento + 2).padEnd(comprimento, '0');
};

export const atualizarSaque = async (userDataClient, valorRequerido, reloadUserData) => {
    
    try {
        const userDocRef = doc(db, 'USERS', userDataClient.CPF);

        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
            throw new Error('Usuário não encontrado');
        }


        const novoSaque = {
            VALORREQUERIDO: valorRequerido.toString(),
            DATAREQUERIMENTO: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            ACEITO: false,
            VISTO: false,
            SAQUECOD: gerarStringAleatoria()
        };


        await updateDoc(userDocRef, {
            SAQUES: arrayUnion(novoSaque) 
        });

        if (reloadUserData) {
            await reloadUserData();
        }

        console.log('Saque atualizado com sucesso!');

    } catch (error) {
        console.error("Erro ao atualizar saque: ", error);
        alert("Erro ao atualizar saque: ", error)
        throw error;
    }
};