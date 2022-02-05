import React from "react";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./Sidebar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";

const sidebar = (props) => {
  let classNames = [classes.Sidebar, classes.Close];
  if (props.show) classNames = [classes.Sidebar, classes.Open];

  return (
    <div>
      <Backdrop show={props.show} clicked={props.clicked} />
      <div className={classNames.join(" ")}>
        <span onClick={props.clicked}>&#10006;</span>
        <div>
          <NavigationItems clicked={props.clicked} />
        </div>
      </div>
    </div>
  );
};

export default sidebar;
