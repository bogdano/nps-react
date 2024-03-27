// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB48yK0Y-oXzcttZOCea1l86-PWzEOndos",
  authDomain: "firetest-bogz.firebaseapp.com",
  projectId: "firetest-bogz",
  storageBucket: "firetest-bogz.appspot.com",
  messagingSenderId: "412382821949",
  appId: "1:412382821949:web:82b2ef2e1b985056907454"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
export const db = getFirestore(app);
// Initialize authentication system
const auth = getAuth(app);

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(error);
    });
};