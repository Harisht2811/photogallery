import { initializeApp } from "firebase/app";
import { getStorage }   from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAap9S_oNo_Vt0SaQtcRc8bPQBmVrAhw1U",
  authDomain: "photo-gallery-f021e.firebaseapp.com",
  projectId: "photo-gallery-f021e",
  storageBucket: "photo-gallery-f021e.appspot.com",
  messagingSenderId: "885531758984",
  appId: "1:885531758984:web:8fac95c83bb7187ef5aa3d",
  measurementId: "G-JW7BS92M2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
