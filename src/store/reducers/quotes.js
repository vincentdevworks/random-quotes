import * as actionTypes from "../actions/actionTypes";

const initialState = {
  content: {
    author: null,
    id: null,
    quote: null,
    tags: null,
  },
  tags: [
    { name: "famous-quotes", value: false },
    { name: "inspirational", value: false },
    { name: "friendship", value: false },
    { name: "wisdom", value: false },
  ],
  loading: false,
  error: false,
};

const newQuoteStart = (state) => {
  return { ...state, loading: true };
};

const newQuoteSuccess = (state, action) => {
  let content = {
    author: action.author,
    id: action.id,
    quote: action.quote,
    tags: action.tags,
  };
  return { ...state, content, loading: false, error: false };
};

const newQuoteFail = (state) => {
  let content = {
    ...state.content,
    author: "Something went wrong",
    id: null,
    quote: "Something went wrong",
    tags: "",
  };
  return {
    ...state,
    content,
    error: true,
    loading: false,
  };
};

const toggleFilter = (state, action) => {
  let newState = { ...state };
  let newTags = [...state.tags];
  newTags = newTags.map((item) => {
    if (item.name === action.name) {
      item.value = !item.value;
    }
    return item;
  });
  newState.tags = newTags;
  return {
    ...newState,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEW_QUOTE_START:
      return newQuoteStart(state);
    case actionTypes.NEW_QUOTE_SUCCESS:
      return newQuoteSuccess(state, action);
    case actionTypes.NEW_QUOTE_FAIL:
      return newQuoteFail(state);
    case actionTypes.TOGGLE_FILTER:
      return toggleFilter(state, action);
    default:
      return state;
  }
};

export default reducer;
