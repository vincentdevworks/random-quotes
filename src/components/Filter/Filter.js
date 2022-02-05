import React from "react";
import classes from "./Filter.module.css";
import { connect } from "react-redux";
import Input from "../UI/Input/Input";
import * as actions from "../../store/actions/index";

const filter = (props) => {
  const clicked = (name, tags) => {
    props.onToggleFilter(name);
    props.onTogglingFilter(tags);
  };
  const items = props.tags.map((input) => {
    return (
      <Input
        type="checkbox"
        key={input.name}
        name={input.name}
        value={input.name}
        checked={input.value}
        id={input.name}
        for={input.name}
        val={input.value}
        clicked={() => clicked(input.name, props.tags)}
      >
        {input.name === "famous-quotes"
          ? "Famous Quotes"
          : input.name[0].toUpperCase() + input.name.slice(1)}
      </Input>
    );
  });
  return <div className={classes.Filter}>{items}</div>;
};

const mapStateToProps = (state) => ({
  tags: state.quotes.tags,
});

const mapDispatchToProps = (dispatch) => ({
  onToggleFilter: (name) => dispatch(actions.toggleFilter(name)),
  onTogglingFilter: (tags) => dispatch(actions.togglingFilter(tags)),
});

export default connect(mapStateToProps, mapDispatchToProps)(filter);
