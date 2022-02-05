import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-quotes";
import { utilFilter } from "../../shared/utility";

const newQuoteStart = () => {
  return {
    type: actionTypes.NEW_QUOTE_START,
  };
};

const newQuoteSuccess = (quote, author, id, tags) => {
  return {
    type: actionTypes.NEW_QUOTE_SUCCESS,
    quote,
    author,
    id,
    tags,
  };
};

const newQuoteFail = () => {
  return {
    type: actionTypes.NEW_QUOTE_FAIL,
  };
};

export const newQuote = (tagsArr) => {
  return async (dispatch) => {
    dispatch(newQuoteStart());
    let link = "/random";
    if (tagsArr.length > 0) {
      link += "?tags=";
    }
    tagsArr.map((item) => {
      link += item;
    });
    if (tagsArr.length > 0) {
      link += "&&maxLength=230";
    } else {
      link += "?maxLength=230";
    }
    try {
      let res = await axios.get(link);
      dispatch(
        newQuoteSuccess(
          res.data.content,
          res.data.author,
          res.data._id,
          res.data.tags
        )
      );
    } catch (error) {
      dispatch(newQuoteFail());
    }
  };
};

export const toggleFilter = (name) => {
  return {
    type: actionTypes.TOGGLE_FILTER,
    name,
  };
};

export const togglingFilter = (tags) => {
  return (dispatch) => {
    let arr = utilFilter(tags);
    dispatch(newQuote(arr));
  };
};
