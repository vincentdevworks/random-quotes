import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import quotes from "./store/reducers/quotes";
import auth from "./store/reducers/auth";
import favorites from "./store/reducers/favorites";
import { Provider } from "react-redux";

const enhancers =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);

const rootReducer = combineReducers({
  quotes: quotes,
  auth: auth,
  favorites: favorites,
});

const store = createStore(rootReducer, enhancers);

const app = (
  <Provider store={store}>
    <BrowserRouter basename="/random-quotes">
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
