import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDVx-oYxT5cAYr_lPM3tkbqNZs65GidmMo",
  authDomain: "recomend-system.firebaseapp.com",
  projectId: "recomend-system",
  storageBucket: "recomend-system.appspot.com",
  messagingSenderId: "188336269586",
  appId: "1:188336269586:web:59edea0086120fb07e2bcb",
  measurementId: "G-95WNQ12WJV",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
