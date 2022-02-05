import React, { Component } from "react";
import classes from "./Favorites.module.css";
import FavCard from "../../components/UI/FavCard/FavCard";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import NoFavorites from "../../components/UI/NoFavorites/NoFavorites";

class Favorites extends Component {
  componentDidMount() {
    if (this.props.auth) {
      this.props.fetchFav(this.props.token, this.props.userId);
    }
  }

  onDeleteHandler = async (key, token, fromDelete) => {
    let response = await this.props.deleteFav(key, token);
    if (response.status === 200) {
      this.props.fetchFav(this.props.token, this.props.userId, fromDelete);
    }
  };

  render() {
    let favorites = <NoFavorites />;
    if (this.props.auth && this.props.fav.length > 0) {
      favorites = (
        <div className={classes.Container}>
          {this.props.fav.map((res) => {
            return (
              <FavCard
                date={res.dateModified}
                quote={res.quote}
                author={res.author}
                key={res.quoteId}
                clicked={() =>
                  this.onDeleteHandler(res.key, this.props.token, true)
                }
              />
            );
          })}
        </div>
      );
    }

    if (this.props.loading) {
      favorites = (
        <div className={classes.Center}>
          <Spinner />
        </div>
      );
    }

    return <div className={classes.Favorites}>{favorites}</div>;
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  userId: state.auth.userId,
  auth: state.auth.token !== null,
  fav: state.favorites.favorites,
  loading: state.favorites.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFav: (token, userId, fromDelete) =>
    dispatch(actions.fetchFavorites(token, userId, fromDelete)),
  deleteFav: (key, token) => dispatch(actions.deleteFavorite(key, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
