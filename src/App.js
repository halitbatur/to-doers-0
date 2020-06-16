import React from "react";
import BoardContainer from "./Containers/boardContainer/BoardContainer";
import CompletedContainer from "./Containers/completedContainer/CompletedContainer";
import PomodoroContainer from "./Containers/pomodoroContainer/PomodoroContainer";
import AboutContainer from "./Containers/aboutPageContainer/about";
import SideNavBar from "./Components/navBar/SideNavbar";
import AppBar from "./Components/navBar/AppBar";
import { Grid } from "@material-ui/core";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ContactContainer from "./Containers/contactUsContainer/contact";

export default function App() {
  return (
    <Router>
      <div className="App">
        <AppBar></AppBar>
        <Grid container spacing={3}>
          <SideNavBar />
          <Route exact path="/" component={BoardContainer} />
          <Route exact path="/pomodoro" component={PomodoroContainer} />
          <Route exact path="/completed" component={CompletedContainer} />
          <Route exact path="/about" component={AboutContainer} />
          <Route exact path="/contactus" component={ContactContainer} />
        </Grid>
      </div>
    </Router>
  );
}
