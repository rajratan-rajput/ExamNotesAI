
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAglvVbtSG0rpULRzNV__k_wUZYG-gS9sg",
  authDomain: "examnotesai-42452.firebaseapp.com",
  projectId: "examnotesai-42452",
  storageBucket: "examnotesai-42452.firebasestorage.app",
  messagingSenderId: "837256428244",
  appId: "1:837256428244:web:216a762da48f8b9f3ed941",
  measurementId: "G-HKHGRE0DH5"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}