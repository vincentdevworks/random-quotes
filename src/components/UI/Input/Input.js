import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let input = null;
  let authInputClass = [classes.AuthInput];
  if (props.valid && props.touched) {
    authInputClass.push(classes.Valid);
  }
  if (!props.valid && props.touched) {
    authInputClass.push(classes.Invalid);
  }
  let labelClass = [classes.Pointer];
  if (props.val) {
    labelClass.push(classes.Bold);
  }
  switch (props.type) {
    case "checkbox":
      input = (
        <div>
          <input
            className={classes.Pointer}
            type={props.type}
            name={props.name}
            value={props.value}
            id={props.id}
            onClick={props.clicked}
            defaultChecked={props.checked}
          />
          <label className={labelClass.join(" ")} htmlFor={props.for}>
            {props.children}
          </label>
        </div>
      );
      break;
    case "authInput":
      input = (
        <div>
          {props.elConfig.type === "email" ? (
            <input
              onChange={props.changed}
              onKeyUpCapture={props.changed}
              value={props.val}
              className={authInputClass.join(" ")}
              {...props.elConfig}
            />
          ) : (
            <input
              onChange={props.changed}
              value={props.val}
              className={authInputClass.join(" ")}
              {...props.elConfig}
            />
          )}
        </div>
      );
      break;
  }
  return input;
};

export default input;
