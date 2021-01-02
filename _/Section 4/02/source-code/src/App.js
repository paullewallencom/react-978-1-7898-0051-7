import React, { Component } from "react";
import { connect } from "react-redux";
import Category from "./components/category";
import Movie from "./components/movie";
import Player from "./components/player";
import "./App.css";

class App extends Component {
  render() {
    if (this.props.movie.selectedMovie) return <Player />;
    return (
      <div>
        <div>
          <Category />
        </div>
        <div>
          <Movie />
        </div>
      </div>
    );
  }
}

const mapToStateToProps = state => {
  return {
    movie: state.movie
  };
};

export default connect(mapToStateToProps)(App);
