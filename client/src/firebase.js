// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fir-84f23.firebaseapp.com",
  projectId: "fir-84f23",
  storageBucket: "fir-84f23.firebasestorage.app",
  messagingSenderId: "653569971980",
  appId: "1:653569971980:web:c51bbb59e682dcf3ff5b29",
  measurementId: "G-C0C69RKS88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}
