import React from "react";
import "./index.css";
import Stepper from "./stepper/Stepper";
import { Grid } from "@material-ui/core";
export default function About() {
  //document.getElementById()
  return (
    <Grid className="wrapper" item container lg={9}>
      <Grid item lg={12} className="tutorialHeader">
        <header>Welcome to the tutorial!</header>
      </Grid>
      <Grid item lg={6} className="stepper">
        <Stepper />
      </Grid>
      <Grid item lg={6} className="gifs">
        <img />
        <img />
        <img />
      </Grid>
    </Grid>
  );
}
