import React from "react";
import classes from "./Spinner.module.css";

const spinner = (props) => {
  let assClass =
    props.type === "white" ? classes.SpinnerQuotes : classes.Spinner;
  return <div className={assClass}>loading...</div>;
};

export default spinner;
