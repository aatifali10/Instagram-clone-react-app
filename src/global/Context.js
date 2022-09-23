import { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

export const contextProvider = createContext();
const Context = (props) => {
  const [model, setModel] = useState(false);
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    auth.onAuthStateChanged;
  });

  return (
    <contextProvider.Provider
      value={{ model, openModel, closeModel, register, login }}
    >
      {props.children}
    </contextProvider.Provider>
  );
};

export default Context;
