import React from "react";
import { hot } from "react-hot-loader";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1>React App</h1>
      <img id="image" />
    </div>
  );
};

export default hot(module)(App);
