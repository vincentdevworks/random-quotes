import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadCry } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import classes from "./PageNotFound.module.css";

const pageNotFound = () => {
  return (
    <div className={classes.PageNotFound}>
      <FontAwesomeIcon icon={faSadCry} size="10x" />
      <h2>Page not Found</h2>
      <p>
        Go back to{" "}
        <span>
          <Link to="/">home page</Link>
        </span>
      </p>
    </div>
  );
};

export default pageNotFound;
