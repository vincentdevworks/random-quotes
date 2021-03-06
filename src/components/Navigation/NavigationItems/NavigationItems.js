import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/Navigationitem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const navigationItems = (props) => {
  let colorClass = "";
  if (props.favoritesLength > 0) {
    colorClass = classes.Color;
  }

  return (
    <nav>
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact="true" clicked={props.clicked}>
          Quotes
        </NavigationItem>
        <NavigationItem link="/favorites" exact="true" clicked={props.clicked}>
          Favorites <sup className={colorClass}>{props.favoritesLength}</sup>
        </NavigationItem>
        <NavigationItem
          link="/"
          type="Sign out"
          exact="true"
          clicked={props.clicked}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          Sign out
        </NavigationItem>
      </ul>
    </nav>
  );
};

export default navigationItems;
