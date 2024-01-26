import {getFirestore} from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCHZ-9Z1eNkqPf-1jIqkNdWnDA90VAXehU",
  authDomain: "mohamd-drag.firebaseapp.com",
  projectId: "mohamd-drag",
  storageBucket: "mohamd-drag.appspot.com",
  messagingSenderId: "198459694421",
  appId: "1:198459694421:web:578cdc5e85ca5dd00c63dc",
  measurementId: "G-CEZ94TPJ2M"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
