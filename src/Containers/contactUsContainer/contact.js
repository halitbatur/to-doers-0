import React from "react";
import "./index.css";
import { Grid } from "@material-ui/core";

export default function ContactContainer() {
  return (
    <Grid item lg={9}>
      <h1>
        This was a project started at Re:Coded Front End Development Bootcamp
        2020.
      </h1>
      <div>
        <h2>Creators</h2>
        <div>
          <h3>Halit Batur</h3>
          {/* <img />
          <a>
            <img />
          </a> */}
        </div>
        <div>
          <h3>Bilge Dal</h3>
          {/* <img />
          <a>
            <img />
          </a> */}
        </div>
      </div>
    </Grid>
  );
}
