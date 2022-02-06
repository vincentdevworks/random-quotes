import React, { Component } from "react";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import classes from "./Layout.module.css";
import { utilFilter } from "../../shared/utility";
import Button from "../../components/UI/Button/Button";
import Authentication from "../../container/Authentication/Authentication";
import SignoutMobile from "../../components/UI/SignoutMobile/SignoutMobile";
import AuthContext from "../../store/auth-context";

class Layout extends Component {
  componentDidMount() {
    let arr = utilFilter(this.props.tags);
    this.props.onNext(arr);
  }

  state = {
    sidebar: false,
    login: false,
    signup: false,
    modal: false,
    fromFav: false,
  };

  sidebarToggleHandler = () => {
    this.setState((prevstate) => ({
      sidebar: !prevstate.sidebar,
    }));
  };

  loginHandler = () => {
    this.setState({ login: true, modal: true, signup: false });
  };

  signupHandler = (favorites) => {
    if (favorites) {
      this.setState({
        signup: true,
        modal: true,
        login: false,
        fromFav: true,
      });
    } else {
      this.setState({
        signup: true,
        modal: true,
        login: false,
      });
    }
  };

  closeModal = () => {
    this.setState({
      login: false,
      signup: false,
      modal: false,
      fromFav: false,
    });
    this.props.onClear();
  };

  render() {
    let navigations = (
      <div className={classes.Auth}>
        <Button
          type="auth"
          clickedLogin={this.loginHandler}
          clickedSignup={() => this.signupHandler(false)}
        />
      </div>
    );
    if (this.props.auth) {
      navigations = (
        <React.Fragment>
          <Toolbar
            clicked={this.sidebarToggleHandler}
            favoritesLength={this.props.favoritesLength}
          />
          <Sidebar
            show={this.state.sidebar}
            clicked={this.sidebarToggleHandler}
            favoritesLength={this.props.favoritesLength}
          />
          <SignoutMobile link="/" clicked={this.props.logout} />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <AuthContext.Provider
          value={{
            clicked: this.signupHandler,
            fromFav: this.state.fromFav,
          }}
        >
          {this.state.modal && (
            <Authentication
              closed={this.closeModal}
              signup={this.state.signup}
              login={this.state.login}
              clickedLogin={this.loginHandler}
              clickedSignup={this.signupHandler}
              fromFav={this.state.fromFav}
            />
          )}
          <div className={classes.Layout}>
            <div className={classes.NavigationContainer}></div>
            {navigations}
            <main>{this.props.children}</main>
          </div>
        </AuthContext.Provider>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onNext: (tags) => dispatch(actions.newQuote(tags)),
  logout: () => dispatch(actions.logout()),
  onClear: () => dispatch(actions.clear()),
});

const mapStateToProps = (state) => ({
  tags: state.quotes.tags,
  auth: state.auth.token !== null,
  loading: state.auth.loading,
  favoritesLength: state.favorites.favorites.length,
});
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
