import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCt1ASQ3omCKOqbkNBPKEKM8aHQJ8Mbkiw",
    authDomain: "miniblog-5a767.firebaseapp.com",
    projectId: "miniblog-5a767",
    storageBucket: "miniblog-5a767.appspot.com",
    messagingSenderId: "235218286298",
    appId: "1:235218286298:web:01ee9e7b48ea231e8757e3"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }