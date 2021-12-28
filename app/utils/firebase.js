import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCPgRohreoKM0jJLZwyTx0fKDjwwXYn4tY",
  authDomain: "tarija-sites-3.firebaseapp.com",
  projectId: "tarija-sites-3",
  storageBucket: "tarija-sites-3.appspot.com",
  messagingSenderId: "53932243132",
  appId: "1:53932243132:web:58ecc656f14bed42bd78b9",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
