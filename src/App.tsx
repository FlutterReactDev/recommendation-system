import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDVx-oYxT5cAYr_lPM3tkbqNZs65GidmMo",
  authDomain: "recomend-system.firebaseapp.com",
  projectId: "recomend-system",
  storageBucket: "recomend-system.appspot.com",
  messagingSenderId: "188336269586",
  appId: "1:188336269586:web:59edea0086120fb07e2bcb",
  measurementId: "G-95WNQ12WJV",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



const App = () => {
  return <div>dsdas</div>;
};

export default App;
