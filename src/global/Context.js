import { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

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
  // const Logout = () => {
  //   auth
  //     .signOut(function () {
  //       setUser(null);
  //     })
  //     .catch((error) => {
  //       console.log("error of logout funcation", error);
  //     });
  // };
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
      }}
    >
      {props.children}
    </contextProvider.Provider>
  );
};

export default Context;
