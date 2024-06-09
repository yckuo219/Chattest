// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMM1u5DTfXDUi-2ZBWx9D5MRjm17jdu_w",
  authDomain: "chattest-ae184.firebaseapp.com",
  databaseURL: "https://chattest-ae184-default-rtdb.firebaseio.com",
  projectId: "chattest-ae184",
  storageBucket: "chattest-ae184.appspot.com",
  messagingSenderId: "768325792551",
  appId: "1:768325792551:web:90917c54fafcd937be2f02",
  measurementId: "G-9RST1S7RPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
