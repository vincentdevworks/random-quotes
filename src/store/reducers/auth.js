import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  loading: false,
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, loading: true };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        loading: false,
        closeModal: true,
      };
    case actionTypes.AUTH_FAIL:
      return { ...state, loading: false, errorMessage: action.errorMessage };
    case actionTypes.LOGOUT:
      return { ...state, token: null, userId: null };
    case actionTypes.CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: "",
      };
    default:
      return state;
  }
};

export default reducer;
