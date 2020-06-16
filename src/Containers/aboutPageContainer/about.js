import React from "react";
import "./index.css";
import Stepper from "./stepper/Stepper";
import { Grid } from "@material-ui/core";
export default function About() {
  //document.getElementById()
  return (
    <Grid className="wrapper" item lg={9}>
      <div className="tutorialHeader">
        <header>Welcome to the tutorial!</header>
      </div>
      <div className="tutorialMain">
        <div className="stepper">
          <Stepper />
        </div>
        <div className="gifs">
          {/* <img />
          <img />
          <img /> */}
        </div>
      </div>
    </Grid>
  );
}
