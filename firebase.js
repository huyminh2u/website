// Import the functions you need from the SDKs you need
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.gosam/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv6z5BS_Kb9QM6rEMwAjHiQyiC_bSrM2Q",
  authDomain: "minh-887bc.firebaseapp.com",
  projectId: "minh-887bc",
  storageBucket: "minh-887bc.appspot.com",
  messagingSenderId: "17261917757",
  appId: "1:17261917757:web:7834da7174f65fd9bc1c54",
  measurementId: "G-LPNF3N945E",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
