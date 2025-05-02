import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAHxJUlh6XgQtr16eq--fZzHvuKqZxCB5g",
    authDomain: "spk-hytta.firebaseapp.com",
    projectId: "spk-hytta",
    storageBucket: "spk-hytta.appspot.com",
    messagingSenderId: "508319635743",
    appId: "1:508319635743:web:7c72263bea1d3720df382a",
    measurementId: "G-XZ49LK0DYK"
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