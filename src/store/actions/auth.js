import * as actionTypes from "./actionTypes";
import axios from "../../axios-auth";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};

const authFail = (errorMessage) => {
  return {
    type: actionTypes.AUTH_FAIL,
    errorMessage,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expiryDate");
  return {
    type: actionTypes.LOGOUT,
  };
};

const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
      console.log("here 3");
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return async (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url =
      "accounts:signInWithPassword?key=AIzaSyCshNN4l-Rlw4UCAflTGxKlFmtu8du-t4M";
    if (isSignUp) {
      url = "accounts:signUp?key=AIzaSyCshNN4l-Rlw4UCAflTGxKlFmtu8du-t4M";
    }
    try {
      let response = await axios.post(url, authData);
      const expiryDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem("expiryDate", expiryDate);
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("userId", response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
      return response;
    } catch (err) {
      dispatch(authFail(err.response.data.error.message));
      return err;
    }
  };
};

export const clearErrorMessage = () => {
  return {
    type: actionTypes.CLEAR_ERROR_MESSAGE,
  };
};

export const clear = () => {
  return (dispatch) => {
    dispatch(clearErrorMessage());
  };
};

export const authCheckState = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expiryDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }

    return "Done";
  };
};
