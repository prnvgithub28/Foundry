import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzLcA0fngj6OSHF4UeD8z1XizS2t-YXE4",
  authDomain: "foundry-app-3c5bb.firebaseapp.com",
  projectId: "foundry-app-3c5bb",
  storageBucket: "foundry-app-3c5bb.firebasestorage.app",
  messagingSenderId: "513609147458",
  appId: "1:513609147458:web:536c86905a43cb06c2b9db",
  measurementId: "G-XEGPYD84RN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup
};
