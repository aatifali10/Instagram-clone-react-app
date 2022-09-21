import React from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import Context from "./global/Context";
import Model from "./component/Model";

function App() {
  return (
    <Context>
      <Navbar />
      <Model />
    </Context>
  );
}

export default App;
