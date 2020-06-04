import React from "react";
import BoardContainer from "./Containers/BoardContainer";
import NavBar from "./Components/Navbar";
import db from "./FireBaseConfig";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route exact path="/" component={BoardContainer} />
      </Router>
    </div>
  );
}
