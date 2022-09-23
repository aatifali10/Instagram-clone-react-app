import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaBP4Oue_XBZcJhlS2hv2B6RYs6rWbsHQ",
  authDomain: "instgram-clone-react-app-be493.firebaseapp.com",
  projectId: "instgram-clone-react-app-be493",
  storageBucket: "instgram-clone-react-app-be493.appspot.com",
  messagingSenderId: "956495777645",
  appId: "1:956495777645:web:ee23876523f68c3e14d464",
  measurementId: "G-WH6MY7EGBY",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };
