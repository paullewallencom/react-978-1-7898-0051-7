import React, { Component } from "react";
import { NavPane, NavPaneItem } from "react-desktop/windows";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import "./App.css";

class App extends Component {
  static defaultProps = {
    color: "#cc7f29",
    theme: "light"
  };

  state = {
    selected: "Home"
  };

  render() {
    return (
      <NavPane
        openLength={200}
        push
        color={this.props.color}
        theme={this.props.theme}
      >
        <NavPaneItem
          title="Home"
          theme="light"
          background="#ffffff"
          selected={this.state.selected === "Home"}
          onSelect={() => this.setState({ selected: "Home" })}
          padding="10px 20px"
          push
        >
          <HomeScreen />
        </NavPaneItem>
        <NavPaneItem
          title="Settings"
          theme="light"
          background="#ffffff"
          selected={this.state.selected === "Settings"}
          onSelect={() => this.setState({ selected: "Settings" })}
          padding="10px 20px"
          push
        >
          <SettingsScreen />
        </NavPaneItem>
      </NavPane>
    );
  }
}

export default App;
