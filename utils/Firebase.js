// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7-AhsuGmhsjQ1wG7NJrp1-ROGFpbTzRo",
  authDomain: "loginsosign.firebaseapp.com",
  projectId: "loginsosign",
  storageBucket: "loginsosign.firebasestorage.app",
  messagingSenderId: "12104021682",
  appId: "1:12104021682:web:dac6f996147d3e5918bbab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };