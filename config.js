// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
