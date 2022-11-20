import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//import from firebase
import { onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

//init firebase app
initializeApp(firebaseConfig);

//init services
const auth = getAuth();

//subscribing to auth changes
// console.log(
//   onAuthStateChanged(auth, (user) => {
//     console.log("user status changed", user);
//     //alert("user staus changed");
//   })
// );

//console.log("userLoggedInStatus", userLoggedInStatus);

export default auth;
