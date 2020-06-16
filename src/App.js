import React from "react";
import BoardContainer from "./Containers/boardContainer/BoardContainer";
import CompletedContainer from "./Containers/completedContainer/CompletedContainer";
import PomodoroContainer from "./Containers/pomodoroContainer/PomodoroContainer";
import NavBar from "./Components/navBar/Navbar";
import { Grid } from "@material-ui/core";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Grid className="App" container spacing={0}>
        <NavBar />
        <Route exact path="/" component={BoardContainer} />
        <Route exact path="/pomodoro" component={PomodoroContainer} />
        <Route exact path="/completed" component={CompletedContainer} />
      </Grid>
    </Router>
  );
}
