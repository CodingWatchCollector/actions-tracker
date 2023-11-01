// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCYmEv7ioD6tZWdZRSyD8m44eSMFyfgZJc",
  authDomain: "events-tracker-1e09c.firebaseapp.com",
  projectId: "events-tracker-1e09c",
  storageBucket: "events-tracker-1e09c.appspot.com",
  messagingSenderId: "216806730782",
  appId: "1:216806730782:web:f5d3ffac4fce2a4047920f",
};

// Initialize Firebase
export var app = initializeApp(firebaseConfig);

export var db = getFirestore(app);
