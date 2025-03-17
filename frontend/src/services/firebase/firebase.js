// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBrS3k1kX3SzSZYV9-AV3kAoq6D0O3iCqk",
    authDomain: "netflix-clone-syarief-hay.firebaseapp.com",
    projectId: "netflix-clone-syarief-hay",
    storageBucket: "netflix-clone-syarief-hay.firebasestorage.app",
    messagingSenderId: "616843030686",
    appId: "1:616843030686:web:264c2f641c0eabe74c0b8f",
    measurementId: "G-1D2FMWPJGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export { auth, provider }