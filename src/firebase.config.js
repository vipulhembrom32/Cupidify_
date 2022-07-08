import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD0ULxfrUwJ-k5_oWrKhu54bKaobDKQjhY",
    authDomain: "cupidify-f42bf.firebaseapp.com",
    projectId: "cupidify-f42bf",
    storageBucket: "cupidify-f42bf.appspot.com",
    messagingSenderId: "91745377257",
    appId: "1:91745377257:web:ac965be1b805315f7f0978"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };
