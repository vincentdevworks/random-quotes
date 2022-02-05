import * as actionTypes from "./actionTypes";
import axios from "../../axios-favorites";

const addFavoriteStart = () => {
  return {
    type: actionTypes.ADD_FAVORITE_START,
  };
};

const addFavoriteSuccess = () => {
  return {
    type: actionTypes.ADD_FAVORITE_SUCCESS,
  };
};

const addFavoriteFail = (errMessage) => {
  return {
    type: actionTypes.ADD_FAVORITE_FAIL,
    errMessage,
  };
};

export const addFavorite = (token, userId, quoteId, quote, author) => {
  return async (dispatch) => {
    dispatch(addFavoriteStart());
    let date = new Date();
    let dateModified = date.toLocaleDateString("en-US");
    let data = {
      date,
      userId,
      quoteId,
      quote,
      author,
      dateModified,
    };
    let queryParams = "?auth=" + token;
    try {
      let response = await axios.post("/favorites.json" + queryParams, data);
      return response;
    } catch (error) {
      dispatch(addFavoriteFail());
      return error;
    }
  };
};

const fetchFavoritesStart = () => {
  return {
    type: actionTypes.FETCH_FAVORITE_START,
  };
};

const fetchFavoritesSuccess = (favorites) => {
  return {
    type: actionTypes.FETCH_FAVORITE_SUCCESS,
    favorites,
  };
};

const fetchFavoritesFail = (errMessage) => {
  return {
    type: actionTypes.ADD_FAVORITE_FAIL,
    errMessage,
  };
};

const deleteFavoriteStart = () => {
  return {
    type: actionTypes.DELETE_FAVORITE_START,
  };
};

const deleteFavoriteSuccess = () => {
  return {
    type: actionTypes.DELETE_FAVORITE_SUCCESS,
  };
};

const deleteFavoriteFail = () => {
  return {
    type: actionTypes.DELETE_FAVORITE_FAIL,
  };
};

export const fetchFavorites = (token, userId, fromDelete, fromAdd) => {
  return async (dispatch) => {
    if (!fromDelete) {
      dispatch(fetchFavoritesStart());
    }
    let queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    try {
      let response = await axios.get("/favorites.json" + queryParams);
      let keys = Object.keys(response.data);
      let favorites = keys.map((key) => ({ ...response.data[key], key: key }));
      let favoritesSorted = favorites
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      dispatch(fetchFavoritesSuccess(favoritesSorted));
      return response;
    } catch (err) {
      dispatch(fetchFavoritesFail(err.response.data.error.message));
    }
  };
};

export const deleteFavorite = (key, token) => {
  return async (dispatch) => {
    dispatch(deleteFavoriteStart());
    try {
      let response = await axios.delete(`/favorites/${key}.json?auth=${token}`);
      return response;
    } catch (err) {
      dispatch(deleteFavoriteFail(err.response.data.error.message));
      return err;
    }
  };
};
