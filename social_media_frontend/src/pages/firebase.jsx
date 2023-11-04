// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAedSv0-VZIpkHZM6sdmPWnN_NmYsjusic",
  authDomain: "my-auth-project-223fc.firebaseapp.com",
  projectId: "my-auth-project-223fc",
  storageBucket: "my-auth-project-223fc.appspot.com",
  messagingSenderId: "180906836683",
  appId: "1:180906836683:web:9566552736daa437a1d14e",
  
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage(app)

export default app;
