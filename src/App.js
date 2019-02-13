import React, { Component } from 'react';

import './App.css';

import BoardGame from './containers/BoardGame';

class App extends Component {
  render() {
    return (
      <div className="App">
          <BoardGame/>
      </div>
    );
  }
}

export default App;
