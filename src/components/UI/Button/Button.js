import React from "react";
import classes from "./Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const button = (props) => {
  let button = null;
  switch (props.type) {
    case "next":
      button = (
        <button className={classes.Next} onClick={props.clicked}>
          <span>{props.label}</span>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      );
      break;
    case "fav":
      button = (
        <button className={classes.Fav} onClick={props.clicked}>
          <FontAwesomeIcon icon={faPlus} />
          <span>{props.label}</span>
        </button>
      );
      break;
    case "removeFav":
      button = (
        <button className={classes.RemoveFav} onClick={props.clicked}>
          <FontAwesomeIcon icon={faMinus} />
          <span>{props.label}</span>
        </button>
      );
      break;
    case "submit":
      button = (
        <button
          className={classes.Submit}
          onClick={props.clicked}
          disabled={props.valid}
        >
          {props.children}
        </button>
      );
      break;
    case "auth":
      button = (
        <div className={classes.Auth}>
          <button onClick={props.clickedLogin}>Sign in</button>
          <button onClick={props.clickedSignup}>Sign up</button>
        </div>
      );
      break;
    default:
      return;
  }
  return button;
};

export default button;
