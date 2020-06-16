import React from "react";
import "./index.css";
import Stepper from "./stepper/Stepper"
export default function About() {
    //document.getElementById()
    return (
        <div className="wrapper">
            <div className="tutorialHeader">
                <header>
                    Welcome to the tutorial!
                </header>
            </div>
            <div className="tutorialMain"> 
                <div className="stepper"> 
                <Stepper /> 
                </div>
                <div className="gifs"> 
                <img/>
                <img/>
                <img/>
                </div>  
                </div>
        </div>
    );
}
