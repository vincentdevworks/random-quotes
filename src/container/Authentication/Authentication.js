import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Authentication.module.css";
import { checkValidity } from "../../shared/utility";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Navigate } from "react-router-dom";

class Authentication extends Component {
  state = {
    controls: {
      email: {
        id: "emailInput",
        elementType: "authInput",
        elementConfig: {
          type: "email",
          placeholder: "Email Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
        errorMessage: "",
      },
      password: {
        id: "passwordInput",
        elementType: "authInput",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
        errorMessage: "",
      },
    },
  };

  onChangeHandler = (event, type) => {
    let controls = { ...this.state.controls };
    controls[type].touched = true;
    controls[type].value = event.target.value;
    let [valid, errorMessage] = checkValidity(
      event.target.value,
      controls[type].validation
    );
    controls[type].valid = valid;
    controls[type].errorMessage = errorMessage[0];
    this.setState({ controls });
  };

  onAuth = async (event, email, password, signup, fromFav) => {
    event.preventDefault();
    if (fromFav) {
      let res = await this.props.auth(email, password, signup);
      let addFav;
      if (res.status === 200) {
        addFav = await this.props.onAdd(
          this.props.token,
          this.props.userId,
          this.props.quoteId,
          this.props.quote,
          this.props.author
        );
      }
      if (addFav.status === 200) {
        this.props.fetchFav(this.props.token, this.props.userId);
        this.props.closed();
      }
    } else {
      let res = await this.props.auth(email, password, signup);
      if (res.status === 200) {
        this.props.closed();
      }
    }
  };

  signupLoginHandler = async (loginOrSignup) => {
    let stateArr = Object.keys(this.state.controls).map(
      (item) => this.state.controls[item]
    );
    this.props.onClear();
    loginOrSignup === "login"
      ? this.props.clickedLogin()
      : this.props.clickedSignup();
    let controls = { ...this.state.controls };
    stateArr.map((item) => {
      if (item.touched) {
        controls[item.elementConfig.type].touched = false;
        controls[item.elementConfig.type].value = "";
        controls[item.elementConfig.type].errorMessage = "";
      }
    });
  };

  render() {
    let validity =
      this.state.controls.email.valid && this.state.controls.password.valid;

    let stateArr = Object.keys(this.state.controls).map(
      (item) => this.state.controls[item]
    );

    let text = null;

    let inputs = stateArr.map((item) => {
      return (
        <React.Fragment key={item.id}>
          <Input
            type={item.elementType}
            elConfig={item.elementConfig}
            val={item.value}
            valid={item.valid}
            touched={item.touched}
            changed={(event) =>
              this.onChangeHandler(event, item.elementConfig.type)
            }
          />
          {item.errorMessage && (
            <p style={{ color: "red" }}>{item.errorMessage}</p>
          )}
        </React.Fragment>
      );
    });

    if (this.props.signup) {
      text = (
        <React.Fragment>
          <Button
            type="submit"
            valid={!validity}
            clicked={
              this.props.fromFav
                ? (event) =>
                    this.onAuth(
                      event,
                      this.state.controls.email.value,
                      this.state.controls.password.value,
                      this.props.signup,
                      this.props.fromFav
                    )
                : (event) => {
                    this.onAuth(
                      event,
                      this.state.controls.email.value,
                      this.state.controls.password.value,
                      this.props.signup
                    );
                  }
            }
          >
            Sign Up
          </Button>
          {this.props.errMessage ? (
            <p style={{ color: "red", fontWeight: "bold" }}>
              {this.props.errMessage}
            </p>
          ) : null}
          <p>
            Already have an account?{" "}
            <span>
              <a onClick={() => this.signupLoginHandler("login")}>Login</a>
            </span>
          </p>
        </React.Fragment>
      );
    }

    if (this.props.login) {
      inputs = stateArr.map((item) => {
        return (
          <React.Fragment key={item.id}>
            <Input
              type={item.elementType}
              elConfig={item.elementConfig}
              val={item.value}
              valid={item.valid}
              touched={item.touched}
              changed={(event) =>
                this.onChangeHandler(event, item.elementConfig.type)
              }
            />
          </React.Fragment>
        );
      });
      text = (
        <React.Fragment>
          <Button
            type="submit"
            valid={!validity}
            clicked={
              this.props.fromFav
                ? (event) =>
                    this.onAuth(
                      event,
                      this.state.controls.email.value,
                      this.state.controls.password.value,
                      this.props.signup,
                      this.props.fromFav
                    )
                : (event) => {
                    this.onAuth(
                      event,
                      this.state.controls.email.value,
                      this.state.controls.password.value,
                      this.props.signup
                    );
                  }
            }
          >
            Sign in
          </Button>
          {this.props.errMessage ? (
            <p style={{ color: "red", fontWeight: "bold" }}>
              {this.props.errMessage}
            </p>
          ) : null}
          <p>
            Don't have an account?{" "}
            <span>
              <a onClick={() => this.signupLoginHandler("signup")}>Sign Up</a>
            </span>
          </p>
        </React.Fragment>
      );
    }

    let content = (
      <div className={classes.Authentication}>
        <form>
          {inputs}
          {text}
        </form>
      </div>
    );

    if (this.props.loading) {
      content = (
        <div className={classes.Spinner}>
          <Spinner type="white" />
        </div>
      );
    }

    // if (!this.props.loading) {
    //   if (this.props.authenticated) this.props.closed();
    // }

    return (
      <React.Fragment>
        <Modal>
          <span className={classes.Close} onClick={this.props.closed}>
            &#10006;
          </span>
          {content}
        </Modal>
        <Backdrop show clicked={this.props.closed} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  auth: (email, password, signup) =>
    dispatch(actions.auth(email, password, signup)),
  onClear: () => dispatch(actions.clear()),
  onAdd: (token, userId, quoteId, quote, author) =>
    dispatch(actions.addFavorite(token, userId, quoteId, quote, author)),
  fetchFav: (token, userId) => dispatch(actions.fetchFavorites(token, userId)),
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  closeModal: state.auth.closeModal,
  authenticated: state.auth.token !== null,
  errMessage: state.auth.errorMessage,
  token: state.auth.token,
  userId: state.auth.userId,
  quoteId: state.quotes.content.id,
  quote: state.quotes.content.quote,
  author: state.quotes.content.author,
});

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
