import * as actionTypes from "../actions/actionTypes";

const initialState = {
  favorites: [],
  added: false,
  loading: false,
  errMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_FAVORITE_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.ADD_FAVORITE_FAIL:
      return {
        ...state,
        loading: false,
        errMessage: action.errMessage,
      };
    case actionTypes.DELETE_FAVORITE_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.DELETE_FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
        errMessage: "",
      };
    case actionTypes.DELETE_FAVORITE_FAIL:
      return {
        ...state,
        loading: false,
        errMessage: action.errMessage,
      };
    case actionTypes.FETCH_FAVORITE_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_FAVORITE_SUCCESS:
      return {
        ...state,
        favorites: action.favorites,
        loading: false,
      };
    case actionTypes.FETCH_FAVORITE_FAIL:
      return {
        ...state,
        favorites: [],
        loading: false,
        errMessage: action.errMessage,
      };
    default:
      return state;
  }
};

export default reducer;
