// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCaBP4Oue_XBZcJhlS2hv2B6RYs6rWbsHQ",
  authDomain: "instgram-clone-react-app-be493.firebaseapp.com",
  projectId: "instgram-clone-react-app-be493",
  storageBucket: "instgram-clone-react-app-be493.appspot.com",
  messagingSenderId: "956495777645",
  appId: "1:956495777645:web:ee23876523f68c3e14d464",
  measurementId: "G-WH6MY7EGBY",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
