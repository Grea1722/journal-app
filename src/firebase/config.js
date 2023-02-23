// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAygnVbraHs9rvalGn7F5f29tot4UOdFFI",
  authDomain: "react-cursos-b9009.firebaseapp.com",
  projectId: "react-cursos-b9009",
  storageBucket: "react-cursos-b9009.appspot.com",
  messagingSenderId: "1098084253017",
  appId: "1:1098084253017:web:b70c069e6168dc87482048"
};

// Initialize Firebase
 export const FirebaseApp = initializeApp(firebaseConfig);

 export const FirebaseAuth = getAuth(FirebaseApp);

 export const FirebaseDB = getFirestore(FirebaseApp)