// import firebase from "firebase";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { auth, db, storage } from "../config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  Firestore,
  orderBy,
  query,
  onSnapshot,
  getDoc,
  serverTimestamp,
  doc,
  getDocs,
} from "firebase/firestore";

export const contextProvider = createContext();
const Context = (props) => {
  const [model, setModel] = useState(false);
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [posts, setPosts] = useState([]);

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
    } catch (error) {
      console.log(error);
    }
  };

  const login = (user) => {
    const { email, password } = user;
    {
      const res = signInWithEmailAndPassword(auth, email, password);
      console.log(res);
    }
    setModel(false);
  };

  const Logout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log("error of logout funcation", error);
      });
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
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
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
            console.log("Not eligigble");
            break;
          case "storage/canceled":
            console.log("cancel ");
            break;

          case "storage/unknown":
            console.log(error);
            break;
        }
      },
      async () => {
        try {
          const url = await getDownloadURL(storageRef);

          const docRef = await addDoc(collection(db, "posts"), {
            title,
            image: url,
            username: user.displayName,
            currentTime: serverTimestamp(),
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    );
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoader(false);
    });
  }, []);

  //jis state koo set kero gee use Effect me us koo dependance me nai rakhy
  /// set hoo reha hyy or again chal reha hyy set hoo reha hyy again chal reha hyy ........

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("currentTime", "desc"));
    let unSubscribe = onSnapshot(q, (snapshot) => {
      let data = []; //Create empty array

      snapshot.forEach((doc) => {
        //Each document in single iteration
        //tabii is ko me array me save krwa reha hooo
        data.push(doc.data());
      });
      // ab data me sara document aya  or post me sotre krwa dia
      //SMJHA
      setPosts(data);
    });

    return () => {
      unSubscribe();
    };
  }, []);
  // again loop
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
        posts,
        create,
      }}
    >
      {props.children}
    </contextProvider.Provider>
  );
};

export default Context;
