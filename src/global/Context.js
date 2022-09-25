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
  serverTimestamp,
} from "firebase/firestore";

export const contextProvider = createContext();
const Context = (props) => {
  const [model, setModel] = useState(false);
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
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
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            console.log("Not eligigble");
            break;
          case "storage/canceled":
            // User canceled the upload
            console.log("cancel ");
            break;

          // ...

          case "storage/unknown":
            console.log(error);
            // Unknown error occurred, inspect error.serverResponse
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
        // storage(
        //   image.name.getDownloadURL().then((url) => {
        //     db.collection("posts").add({
        //       title,
        //       image: url,
        //       username: user.displayName,
        //       currentTime: uploadTask.firestore.FieldValue.serverTimestamp(),
        //     });
        //   })
        // );

        // // Upload completed successfully, now we can get the download URL
        // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //   console.log("File available at", downloadURL);
        // });
      }
    );
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoader(false);
    });
  }, []);
  console.log("Login user", user);

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
      }}
    >
      {props.children}
    </contextProvider.Provider>
  );
};

export default Context;
