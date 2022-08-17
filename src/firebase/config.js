// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCj5fTVejylmiifVHFsHxgGWzi-ZPLGODg",
    authDomain: "journalapp-47382.firebaseapp.com",
    projectId: "journalapp-47382",
    storageBucket: "journalapp-47382.appspot.com",
    messagingSenderId: "686199022308",
    appId: "1:686199022308:web:fe163d4be3939aef5bc2f1"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);