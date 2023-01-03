import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth,GoogleAuthProvider,signOut,signInWithPopup } from 'firebase/auth'

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signInWithGoogle = () => {
    signInWithPopup(auth,googleProvider)
    .then((res) => {
        console.log(res.user)
    })
    .catch((error) =>{
        console.log(error.message)
    });
};

export const logOut = () => {
    signOut(auth)
    .then(()=>{
        console.log("logged out");
        document.location.reload();
    })
    .catch((error) => {
        console.log(error.message);
    });
};