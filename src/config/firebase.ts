// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBrP9bZrJQFf7eg4AFIN3mQbZXO7q-o0pw",
    authDomain: "react-pos-f1920.firebaseapp.com",
    projectId: "react-pos-f1920",
    storageBucket: "react-pos-f1920.appspot.com",
    messagingSenderId: "266797595027",
    appId: "1:266797595027:web:e4fb67258cf9a3fe2c5066",
    measurementId: "G-NP754B9B3D"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const storage = firebase.storage;
export default firebase;