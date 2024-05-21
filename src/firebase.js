// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3p2nZj580HpcJF4l27q21GRgTxDu_jCg",
  authDomain: "kursavayarabotakfu.firebaseapp.com",
  projectId: "kursavayarabotakfu",
  storageBucket: "kursavayarabotakfu.appspot.com",
  messagingSenderId: "693062190099",
  appId: "1:693062190099:web:cf486de4d9252cfa776be6",
  measurementId: "G-QLNTTJ4LR9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);