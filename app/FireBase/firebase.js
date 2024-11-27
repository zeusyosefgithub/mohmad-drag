import {getFirestore} from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCHZ-9Z1eNkqPf-1jIqkNdWnDA90VAXehU",
  authDomain: "mohamd-drag.firebaseapp.com",
  projectId: "mohamd-drag",
  storageBucket: "mohamd-drag.firebasestorage.app",
  messagingSenderId: "198459694421",
  appId: "1:198459694421:web:578cdc5e85ca5dd00c63dc",
  measurementId: "G-CEZ94TPJ2M"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const firestore = getFirestore(app);
export const authh = getAuth(app);
export const storagee = getStorage(app);