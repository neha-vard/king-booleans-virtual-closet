// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: "AIzaSyBcEKhWEjV_Trdp37H4gyh_10xPAGcmmGI",
  authDomain: "king-booleans-virtual-closet.firebaseapp.com",
  projectId: "king-booleans-virtual-closet",
  storageBucket: "king-booleans-virtual-closet.appspot.com",
  messagingSenderId: "118489236303",
  appId: "1:118489236303:web:4c17709e390869e72cfb3a",
});

// Initialize Firebase
const storage = getStorage(app);
export { storage };
