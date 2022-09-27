// import firebase from "firebase";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { auth, db, storage } from "../config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
import {
  addDoc,
  collection,
  Firestore,
  // onSnapShot,
  limit,
  orderBy,
  serverTimestamp,
  query,
  endAt,
  getDoc,
  doc,
  docRef,
  onSnapshot,
  // collection,
} from "firebase/firestore";
import Posts from "../component/Posts";
// import { async } from "@firebase/util";

export const contextProvider = createContext();
const Context = (props) => {
  const [model, setModel] = useState(false);
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   return onSnapshot(
  //     query(collection(db, "posts"), orderBy("timestamp", "desc")),
  //     (snapshot) => {
  //       setPosts(snapshot.docs);
  //     }
  //   );
  // }, [db]);
  const openModel = () => {
    setModel(true);
  };
  const closeModel = () => {
    setModel(false);
  };
  const register = async (user) => {
    const { username, email, password } = user;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      setModel(false);
    } catch (error) {}
  };

  const login = (user) => {
    const { email, password } = user;
    {
      const res = signInWithEmailAndPassword(auth, email, password);
    }
    setModel(false);
  };

  const Logout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {});
  };

  const create = (data) => {
    const { title, image } = data;

    const storageRef = ref(storage, image.name);

    const uploadTask = uploadBytesResumable(storageRef, image, {
      contentType: image.type,
    });
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
        }
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          const docRef = await addDoc(
            collection(
              db,
              "posts"
            )({
              title,
              image: url,
              username: user.displayName,
              currentTime: serverTimestamp(),
            })
          );
        } catch (e) {
          console.log("Error adding document: ", e);
        }
      }
    );
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoader(false);

      // return onSnapshot(
      //   query(collection(db, "posts"), orderBy("timestamp", "desc")),
      //   (snapshot) => {
      //     setPosts(
      //       snapshot.docs.map((doc) => ({
      //         id: doc.id,
      //         title: doc.title,
      //         image: doc.image,
      //         username: doc.username,
      //       }))
      //     );
      // },
      // [db]
      // );
    });
  }, []);

  return (
    <contextProvider.Provider
      value={{
        model,
        openModel,
        closeModel,
        register,
        login,
        user,
        loader,
        Logout,
        create,
        posts,
      }}
    >
      {props.children}
    </contextProvider.Provider>
  );
};

export default Context;
