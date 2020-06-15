import React from "react";
import BoardContainer from "./Containers/boardContainer/BoardContainer";
import CompletedContainer from "./Containers/completedContainer/CompletedContainer";
import PomodoroContainer from "./Containers/pomodoroContainer/PomodoroContainer";
import AboutContainer from "./Containers/aboutPageContainer/about";
import NavBar from "./Components/navBar/Navbar";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route exact path="/" component={BoardContainer} />
        <Route exact path="/pomodoro" component={PomodoroContainer} />
        <Route exact path="/completed" component={CompletedContainer} />
        <Route exact path="/about" component={AboutContainer} />
      </Router>
    </div>
  );
}
