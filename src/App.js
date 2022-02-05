import "./App.css";
import React, { Component, Suspense, lazy } from "react";
import Layout from "./hoc/Layout/Layout";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import Card from "./container/Card/Card";
import { Route, Routes } from "react-router-dom";
import Share from "./components/Share/Share";

const Favorites = lazy(() => import("./container/Favorites/Favorites"));

class App extends Component {
  async componentDidMount() {
    let response = await this.props.checkAuth();
    if (response === "Done" && this.props.authenticated) {
      this.props.fetchFav(this.props.token, this.props.userId);
    }
  }

  render() {
    let routes = (
      <Routes>
        {this.props.authenticated ? (
          <React.Fragment>
            <Route
              path="/"
              element={[<Card key="card" />, <Share key="share" />]}
              exact
            />
            <Route
              path="/favorites"
              element={
                <Suspense fallback={<p>Loading</p>}>
                  <Favorites />
                </Suspense>
              }
              exact
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Route
              path="/"
              element={[<Card key="card" />, <Share key="share" />]}
              exact
            />
          </React.Fragment>
        )}
      </Routes>
    );

    return <Layout>{routes}</Layout>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  checkAuth: () => dispatch(actions.authCheckState()),
  fetchFav: (token, userId) => dispatch(actions.fetchFavorites(token, userId)),
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  authenticated: state.auth.token !== null,
  userId: state.auth.userId,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
