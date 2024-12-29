// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIwAO8nGzbvzlsqXoxeT5lbKGAbwB-7fE",
  authDomain: "our-todo-app-8090.firebaseapp.com",
  projectId: "our-todo-app-8090",
  storageBucket: "our-todo-app-8090.appspot.com",
  messagingSenderId: "286930545654",
  appId: "1:286930545654:web:d6f0db65ffff97cad6f5d7",
  measurementId: "G-9TV9SZZMFC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { analytics, auth, firestore };
