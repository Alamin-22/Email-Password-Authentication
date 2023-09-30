// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBtDWglXsuOpBZBg8nFgKhxex5Gu7RAtNU",
    authDomain: "email-password-authentic-4056b.firebaseapp.com",
    projectId: "email-password-authentic-4056b",
    storageBucket: "email-password-authentic-4056b.appspot.com",
    messagingSenderId: "1009209450443",
    appId: "1:1009209450443:web:9ed30f085b58cafe3e204e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;