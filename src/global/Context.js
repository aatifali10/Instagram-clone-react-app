import { useState } from "react";
import { createContext } from "react";
export const contextProvider = createContext();
const Context = (props) => {
  const [model, setModel] = useState(false);
  const openModel = () => {
    setModel(true);
  };
  const closeModel = () => {
    setModel(false);
  };
  const register = async (user)=>{
    const {username,email,password};
    const res =await auth.createUserWithEmailAndPassword({email,password});
  }

  return (
    <contextProvider.Provider value={{ model, openModel, closeModel }}>
      {props.children}
    </contextProvider.Provider>
  );
};

export default Context;
