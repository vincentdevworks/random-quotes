import React from "react";
import classes from "./FavCard.module.css";

const favCard = (props) => {
  return (
    <div className={classes.FavCard}>
      <span onClick={props.clicked}>&#10006;</span>
      <p>{props.quote}</p>
      <span>- {props.author}</span>
      <span>{props.date}</span>
    </div>
  );
};

export default favCard;
