// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDroZ7fHm6b_eYw4csmeL9QNE0Et3HCYmA",
  authDomain: "user-email-password-auth-7330c.firebaseapp.com",
  projectId: "user-email-password-auth-7330c",
  storageBucket: "user-email-password-auth-7330c.appspot.com",
  messagingSenderId: "1090024760856",
  appId: "1:1090024760856:web:58326073a9426ec268456d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth
// export default app