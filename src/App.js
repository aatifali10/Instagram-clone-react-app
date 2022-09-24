import React from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import Context from "./global/Context";
import Model from "./component/Model";
import Stories from "./component/Stories";
import Create from "./component/Create";

function App() {
  return (
    <Context>
      <Navbar />
      <div className="container">
        <Stories />
        <Create />
      </div>
      <Model />
    </Context>
  );
}

export default App;
