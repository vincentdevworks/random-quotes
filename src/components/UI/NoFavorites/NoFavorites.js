import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeh } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import classes from "./NoFavorites.module.css";
const noFavorites = () => {
  return (
    <div className={classes.NoFavorites}>
      <FontAwesomeIcon icon={faMeh} size="10x" />
      <h2>No Favorites Yet</h2>
      <p>
        Go back to <Link to="/">Quotes</Link>
      </p>
    </div>
  );
};

export default noFavorites;
