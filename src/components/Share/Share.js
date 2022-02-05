import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTumblr } from "@fortawesome/free-brands-svg-icons";
import classes from "./Share.module.css";
import { connect } from "react-redux";

const share = (props) => {
  let tags;
  if (props.tags) {
    tags = props.tags;
  }
  let tweetLink = `//twitter.com/intent/tweet?text=${encodeURI(
    props.quote + " - " + props.author
  )}&hashtags=${props.tags ? tags.toString().replace("-", "") : null}`;
  return (
    <div className={classes.Share}>
      <a target="_blank" href={tweetLink}>
        <FontAwesomeIcon
          icon={faTwitter}
          className={classes.Size}
          color="#1DA1F2"
        />
      </a>
    </div>
  );
};

const mapStateToProps = (state) => ({
  quote: state.quotes.content.quote,
  author: state.quotes.content.author,
  tags: state.quotes.content.tags,
});

export default connect(mapStateToProps)(share);
