// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rideapp-9cc73.firebaseapp.com",
  projectId: "rideapp-9cc73",
  storageBucket: "rideapp-9cc73.firebasestorage.app",
  messagingSenderId: "930076645618",
  appId: "1:930076645618:web:a020de0c339525e01b986b",
  measurementId: "G-PK0Z86D08N"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);