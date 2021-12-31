// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import firebase from 'firebase';
// import "firebase/firestore";
import {initializeApp} from "firebase/app";
import {getFirestore} from '@firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5gZc0oGk19MTbXdRcrKYWE8nF_AIcnUY",
  authDomain: "whereswally-134b2.firebaseapp.com",
  databaseURL: "https://whereswally-134b2-default-rtdb.firebaseio.com",
  projectId: "whereswally-134b2",
  storageBucket: "whereswally-134b2.appspot.com",
  messagingSenderId: "607051529373",
  appId: "1:607051529373:web:dcc3797f55a9778a0d2874"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
// var db = firebase.firestore()

// export default firebase;
export default db;