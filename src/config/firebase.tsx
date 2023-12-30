// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import {initializeApp} from 'firebase/app';
// import {getStorage} from 'firebase/storage'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCAJDH6Rj8Eef55VVF6AICLRTHibWEiVvw",
    authDomain: "react-pos-30cf3.firebaseapp.com",
    projectId: "react-pos-30cf3",
    storageBucket: "react-pos-30cf3.appspot.com",
    messagingSenderId: "879380334495",
    appId: "1:879380334495:web:9748b3d93eccbda3dddfaa",
    measurementId: "G-LYGBKJ61XM"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export {storage}