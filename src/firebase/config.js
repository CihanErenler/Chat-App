import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwj3M2MvZeAopqYr7-mNUDIl6_7jqLGJA",
  authDomain: "first-firebase-project-ac530.firebaseapp.com",
  projectId: "first-firebase-project-ac530",
  storageBucket: "first-firebase-project-ac530.appspot.com",
  messagingSenderId: "7770509871",
  appId: "1:7770509871:web:707fb8ee0a1456802b6cda",
};

// init firebase
firebase.initializeApp(firebaseConfig);

//init
const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, timeStamp };
