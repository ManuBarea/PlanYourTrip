import React, { Component } from 'react';

import Map from './map/Map';
import SearchBar from './searchbar/SearchBar';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <SearchBar />
        <Map />
      </div>
    );
  }
}

export default App;
