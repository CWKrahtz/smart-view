// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCTWLOjavfgCN_DXJ9v1KnjBu0OHm30Ww",
  authDomain: "smart-view-bf6cd.firebaseapp.com",
  projectId: "smart-view-bf6cd",
  storageBucket: "smart-view-bf6cd.appspot.com",
  messagingSenderId: "746609481793",
  appId: "1:746609481793:web:fd25707aa397c613edcec0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export var db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});