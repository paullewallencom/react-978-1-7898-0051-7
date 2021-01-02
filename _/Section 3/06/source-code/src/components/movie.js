import React, { Component } from "react";
import { connect } from "react-redux";
import { BounceLoader } from "react-spinners";
import * as movieActions from "../actions/movie";

class Movie extends Component {
  renderPagination() {
    return (
      <div>
        <button
          disabled={this.props.page === 1}
          onClick={() => {
            this.props.startFetchingMovies();
            this.props.getMovies(
              this.props.selected_category,
              this.props.page - 1
            );
          }}
        >
          BACK
        </button>
        <button
          disabled={this.props.page === this.props.maxPage}
          onClick={() => {
            this.props.startFetchingMovies();
            this.props.getMovies(
              this.props.selected_category,
              this.props.page + 1
            );
          }}
        >
          FORWARD
        </button>
      </div>
    );
  }

  renderMovieItem(item, i) {
    return (
      <div key={i}>
        <div>
          <img
            alt="movie"
            key={i}
            width="100"
            height="150"
            src={`${this.props.CATEGORY_FOLDER}/image/${item}`}
            onClick={() => {}}
          />
          <br />
          <span>{item.replace(".jpg", "")}</span>
        </div>
      </div>
    );
  }
  renderMovies() {
    if (this.props.loading)
      return (
        <div>
          <BounceLoader />
        </div>
      );
    else if (!this.props.movies && this.props.selected_category === null)
      return <h1>Select a Category</h1>;
    else if (!this.props.movies) return <h1>No movies</h1>;
    return (
      <div>
        <div>
          {this.props.movies.map((item, i) => this.renderMovieItem(item, i))}
        </div>
        <div>{this.renderPagination()}</div>
      </div>
    );
  }

  render() {
    return <div>{this.renderMovies()}</div>;
  }
}

function mapStateToProps({ category, movie }) {
  return {
    ...category,
    ...movie
  };
}

export default connect(
  mapStateToProps,
  movieActions
)(Movie);
