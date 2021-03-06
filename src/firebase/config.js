import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };
  // console.log(process.env.REACT_APP_FIREBASE_API_KEY)
  // console.log(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN)
  // console.log(process.env.REACT_APP_FIREBASE_PROJECT_ID)
  // console.log(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET)
  // console.log(process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID)
  // console.log(process.env.REACT_APP_FIREBASE_APP_ID)
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export {auth, projectStorage, projectFirestore, timestamp};