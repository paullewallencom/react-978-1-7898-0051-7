import React, { Component } from 'react';
import './App.css';
const { ipcRenderer } = window.require('electron');


class App extends Component {
  state = {
    msgFromMainProcess: ""
  }

  componentDidMount(){
    ipcRenderer.on('event2', (event, data) => {
      this.setState({msgFromMainProcess: data.msg});
    })
  }

  onButtonClick(){
    ipcRenderer.send('event1', {msg: 'data from renderer process'});
  }
  
  render() {
    return (
      <div>
        <h1>Welcome to Electron with React</h1>
        <p>Communicate with Main Process:</p>
        <button onClick={this.onButtonClick}>Click me!</button>
        <p>Message from server: {this.state.msgFromMainProcess}</p>
      </div>
    );
  }
}

export default App;
