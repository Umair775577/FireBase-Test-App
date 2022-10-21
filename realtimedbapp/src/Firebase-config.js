
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA73oHzIAD3ooZ59n4Z1FOGnOCd4jKEvnw",
  authDomain: "testapp-62542.firebaseapp.com",
  databaseURL: "https://testapp-62542-default-rtdb.firebaseio.com",
  projectId: "testapp-62542",
  storageBucket: "testapp-62542.appspot.com",
  messagingSenderId: "929193348095",
  appId: "1:929193348095:web:c61a8027b69c70a551b5ca"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app);