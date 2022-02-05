import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import classes from "./SignoutMobile.module.css";

const signoutMobile = (props) => (
  <Link to={props.link} className={classes.Signout} onClick={props.clicked}>
    <FontAwesomeIcon icon={faSignOutAlt} />
    Sign out
  </Link>
);

export default signoutMobile;
