import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpUPkDI_0I2y_GiqCLMrATbQHO2MlEkpc",
    authDomain: "travelourgpt.firebaseapp.com",
    projectId: "travelourgpt",
    storageBucket: "travelourgpt.appspot.com",
    messagingSenderId: "318042893194",
    appId: "1:318042893194:web:079f538260e1d86764b673"
  };

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };