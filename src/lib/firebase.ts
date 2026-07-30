import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvL63270Sx-Z5zttpUaDtB681MxzlAtM0",
  authDomain: "ync-91baa.firebaseapp.com",
  projectId: "ync-91baa",
  storageBucket: "ync-91baa.firebasestorage.app",
  messagingSenderId: "994938390107",
  appId: "1:994938390107:web:611aca0ba409e4059e617e",
  measurementId: "G-90H7DPSCXD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
