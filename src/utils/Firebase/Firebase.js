import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
// };

const firebaseConfig = {
  apiKey: "AIzaSyA4fJs8I1azwPWJvup0ThULbuOKWMc3e-U",
  authDomain: "cubs-42faf.firebaseapp.com",
  databaseURL:
    "https://cubs-42faf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cubs-42faf",
  storageBucket: "cubs-42faf.appspot.com",
  messagingSenderId: "947860043712",
  appId: "1:947860043712:web:cdf9b67e9e7cbebc823a25",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
