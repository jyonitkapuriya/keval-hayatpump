// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, collection, addDoc, where, query, getDocs, updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import uuid4 from "uuid4";

const firebaseConfig = {
    apiKey: "AIzaSyDCqQBufv4iglFbsx_62P6QbvkeOMaPLuE",
    authDomain: "hayat-pumps.firebaseapp.com",
    projectId: "hayat-pumps",
    storageBucket: "hayat-pumps.appspot.com",
    messagingSenderId: "791551308044",
    appId: "1:791551308044:web:4462407f08bc1d63541929",
    measurementId: "G-LDYQKFPTZ5"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const useAuth = getAuth;
export const storage = getStorage;
const Firestore = getFirestore();

export const loginWithPassword = (email, password) => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user", user)

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export const uploadPumpImage = (image) => {

    if (!image) {
        console.log('No image selected');
        return Promise.resolve(null);
    }
    const storage = getStorage();
    var id = uuid4();
    const storageRef = ref(storage, id);
    return uploadBytes(storageRef, image).then((snapshot) => {
        return getDownloadURL(snapshot.ref);
    }).catch((err) => {
        console.log("err", err);
        return null;
    });
};

export const addPums = async (name, type, downloadURL) => {
    try {
        const docRef = await addDoc(collection(Firestore, 'products'), {
            name: name,
            imageUrl: downloadURL,
            type: type
        });
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

export const getPums = async (name, downloadURL) => {
    try {
        const collectionRef = collection(Firestore, 'products');
        const q = query(collectionRef);
        const res = await getDocs(q);
        const data = res.docs.map((item) => ({ id: item.id, ...item.data() }))
        console.log("this is data", data)
        return data;
    } catch (e) {
        console.error('Error getting documents: ', e);
        throw e; // Rethrow the error to propagate it to the caller
    }
};

export const updatePump = async (docId, newData) => {
    try {
        const docRef = doc(Firestore, 'products', docId);
        await updateDoc(docRef, newData);
        console.log('Document updated successfully');
    } catch (e) {
        console.error('Error updating document: ', e);
        throw e;
    }
};

export const deletePump = async (docId) => {
    try {
        const docRef = doc(Firestore, 'products', docId);
        await deleteDoc(docRef);
        console.log('Document deleted successfully');
    } catch (e) {
        console.error('Error deleting document: ', e);
        throw e;
    }
};

export const addProductSpecification = async (docId, specification) => {
    debugger
    try {
        const docRef = doc(Firestore, 'products', docId);
        await updateDoc(docRef, specification);
        console.log('Document updated successfully');
    } catch (e) {
        console.error('Error updating document: ', e);
        throw e;
    }
}

export const getPump = async (docId) => {
    try {
        const docRef = doc(Firestore, 'products', docId);
        // await deleteDoc(docRef);
        const data = await getDoc(docRef);
        return data.data()
        console.log('Document deleted successfully', data.data());
    } catch (e) {
        console.error('Error deleting document: ', e);
        throw e;
    }
}

export const getFirebaseProduct = async (type) => {
    const collectionRef = collection(Firestore, 'products');
    const q = query(collectionRef, where("type", "==", type));
    const res = await getDocs(q);
    const data = res.docs.map((item) => ({ id: item.id, ...item.data() }))
    return data;
}

export const saveCard = async (id, data) => {
    const collectionRef = collection(Firestore, 'products', id, "cards");
    const res = await addDoc(collectionRef, data);
}

export const getCardDataFromDB = async (id) => {
    const cardRef = collection(Firestore, 'products', id, "cards");
    const q = query(cardRef);
    const doc = await getDocs(q)
    const data = doc.docs.map((val) => ({ ...val.data(), id: val.id }))
    return data
}


export const updateCard = async (docId, cardId, newData) => {
    try {
        const docRef = doc(Firestore, 'products', docId, "cards", cardId);
        await updateDoc(docRef, newData);
        console.log('Document updated successfully');
    } catch (e) {
        console.error('Error updating document: ', e);
        throw e;
    }
};

export const deleteCard = async (docId, cardId) => {
    try {
        const docRef = doc(Firestore, 'products', docId, "cards", cardId);
        await deleteDoc(docRef);
        console.log('Document deleted successfully');
    } catch (e) {
        console.error('Error deleting document: ', e);
        throw e;
    }
};
