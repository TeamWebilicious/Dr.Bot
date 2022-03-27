import firebase from "./firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmtlBoFbbDW4PJgwCfEDGqGKf93wfGExk",
  authDomain: "colombo-mail.firebaseapp.com",
  projectId: "colombo-mail",
  storageBucket: "colombo-mail.appspot.com",
  messagingSenderId: "57832532004",
  appId: "1:57832532004:web:d7d0ea8fd1b47b0bdfd0b1",
  measurementId: "G-WZDQKTP874"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize Firebstore
const db = firebaseApp.firestore();
//functions
const functions = firebase.functions();
//Initialize storage
const st = firebaseApp.storage().ref();
const stR = firebaseApp.storage();
// Authentication From Firebase
const auth = firebase.auth();
//#filed
const field = firebase.firestore;
export {
  db,
  st,
  stR,
  auth,
  field,
  functions
};