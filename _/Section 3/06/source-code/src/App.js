import React, { Component } from "react";
import Category from "./components/category";
import Movie from "./components/movie";
import "./App.css";

class App extends Component {
  render() {
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

export default App;
