import React, { Component } from "react";
import { connect } from "react-redux";
import { BounceLoader } from "react-spinners";
import * as categoryActions from "../actions/category";

class Category extends Component {
  componentDidMount() {
    this.props.startFetchingCategories();
    this.props.getCategories();
  }

  renderCategories() {
    if (this.props.loading)
      return (
        <div>
          <BounceLoader />
        </div>
      );

    return (
      <div>
        <div>
          <h2>Categories</h2>
          <hr />
        </div>
        {this.props.categories.map((item, i) => (
          <div key={i}>
            <div
              onClick={() => {
                alert(item);
              }}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return <div>{this.renderCategories()}</div>;
  }
}

function mapStateToProps({ category }) {
  return category;
}

export default connect(
  mapStateToProps,
  {
    ...categoryActions
  }
)(Category);
