import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.css";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";

const navigationItem = (props) => {
  let navigation = (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        exact={props.exact}
        style={({ isActive }) => {
          if (isActive)
            return {
              color: "black",
              borderBottom: "3px solid #fa8d62",
            };
        }}
        onClick={props.clicked}
      >
        {props.children}
      </NavLink>
    </li>
  );
  if (props.type === "Sign out") {
    navigation = (
      <li className={classes.NavigationItem}>
        <NavLink
          onClick={props.logout}
          to={props.link}
          exact={props.exact}
          className={classes.Signout}
        >
          {props.children}
        </NavLink>
      </li>
    );
  }
  return navigation;
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actions.logout()),
});

export default connect(null, mapDispatchToProps)(navigationItem);
