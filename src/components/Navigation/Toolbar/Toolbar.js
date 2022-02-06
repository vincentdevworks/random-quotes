import React from "react";
import Menu from "../Menu/Menu";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.module.css";

const toolbar = (props) => {
  return (
    <div className={classes.Toolbar}>
      <Menu clicked={props.clicked} />
      <div className={classes.Desktop}>
        <NavigationItems favoritesLength={props.favoritesLength} />
      </div>
    </div>
  );
};

export default toolbar;
