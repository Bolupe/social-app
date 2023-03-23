// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-cIdkBsrxLbxjvRhT_IYjfLmMESwhpbk",
  authDomain: "totally-not-anonymous.firebaseapp.com",
  projectId: "totally-not-anonymous",
  storageBucket: "totally-not-anonymous.appspot.com",
  messagingSenderId: "312323616866",
  appId: "1:312323616866:web:6f7d24139028098240613b",
  measurementId: "G-SY0DSJ9FS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);