import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Initialiserer Firebase-appen og autentisering
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const getToken = async () => {
    const user = auth.currentUser;
    if (user) {
        return await user.getIdToken();
    } else {
        throw new Error("Bruker er ikke logget inn");
    }
};