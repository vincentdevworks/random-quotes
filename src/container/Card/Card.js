import React, { Component } from "react";
import classes from "./Card.module.css";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Filter from "../../components/Filter/Filter";
import { utilFilter } from "../../shared/utility";
import AuthContext from "../../store/auth-context";
import Loader from "../../components/UI/Spinner/Loader/Loader";
import Share from "../../components/Share/Share";

class Card extends Component {
  state = {
    count: 0,
  };

  addFavoriteHandler = async (token, userId, id, quote, author) => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
    let response = await this.props.onAdd(token, userId, id, quote, author);
    let fetchStatus;
    if (response.status === 200) {
      fetchStatus = await this.props.fetchFav(token, userId);
    }
  };

  removeFavoriteHandler = async (token, userId, key) => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
    let response = await this.props.onDelete(key, token);
    let fetchStatus;
    if (response.status === 200) {
      fetchStatus = await this.props.fetchFav(token, userId);
    }
  };

  static contextType = AuthContext;

  render() {
    let favStatus = false;
    if (this.props.favorites.length > 0) {
      favStatus = this.props.favorites.some(
        (el) => el.quoteId === this.props.id
      );
    }

    if (!this.props.auth) {
      favStatus = false;
    }

    let quotes = <Spinner type="white" />;

    let next = (tags) => {
      let arrTags = utilFilter(tags);
      this.props.onNext(arrTags);
    };

    if (this.props.quote) {
      quotes = (
        <div className={classes.Div}>
          <p>"{this.props.quote}"</p>
          <span>-{this.props.author}</span>
        </div>
      );
    }

    if (this.props.loading) {
      quotes = <Spinner type="white" />;
    }
    let favButton = (
      <Button
        type="fav"
        label="Favorites"
        clicked={
          this.props.auth
            ? () =>
                this.addFavoriteHandler(
                  this.props.token,
                  this.props.userId,
                  this.props.id,
                  this.props.quote,
                  this.props.author
                )
            : () => this.context.clicked(true)
        }
      />
    );

    if (favStatus) {
      favButton = (
        <Button
          type="removeFav"
          label="Remove"
          clicked={() =>
            this.removeFavoriteHandler(
              this.props.token,
              this.props.userId,
              this.props.favorites[0].key
            )
          }
        />
      );
    }

    if (
      this.props.favLoading &&
      this.state.count !== 0 &&
      (this.context.fromFav || true)
    ) {
      favButton = (
        <div className={classes.Position}>
          <Loader />
        </div>
      );
    }
    return (
      <div className={classes.Card}>
        <Filter />
        {quotes}
        <div>
          {favButton}
          <Button
            type="next"
            label="Next"
            clicked={() => next(this.props.tags)}
          />
        </div>
        <Share />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  quote: state.quotes.content.quote,
  author: state.quotes.content.author,
  id: state.quotes.content.id,
  loading: state.quotes.loading,
  tags: state.quotes.tags,
  userId: state.auth.userId,
  auth: state.auth.token !== null,
  token: state.auth.token,
  favorites: state.favorites.favorites,
  favLoading: state.favorites.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onNext: (tags) => dispatch(actions.newQuote(tags)),
  onAdd: (token, userId, quoteId, quote, author) =>
    dispatch(actions.addFavorite(token, userId, quoteId, quote, author)),
  fetchFav: (token, userId) => dispatch(actions.fetchFavorites(token, userId)),
  onDelete: (key, token) => dispatch(actions.deleteFavorite(key, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
