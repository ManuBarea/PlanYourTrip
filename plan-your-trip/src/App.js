import React, { Component } from 'react';

import Map from './map/Map';
import SearchBar from './searchbar/SearchBar';

import VenuesClient from './client/venue-client';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: 39.772175,
        longitude: -4.074039,
        zoom: 6
      },
      points: [],
      searching: false
    }
  }

  handleSearch = (data) => {
    this.setState({ searching: true });

    // TODO remove this when VenuesClient.search had been implemented
    setTimeout(() => this.setState({ searching: false }), 2000);

    /* TODO
    VenuesClient.search(...args)
      .then((data) => {
        if (!data.meta || data.meta.code !== 200) {
          console.log('invalid service response', data);
          this.setState({ searching: false });
        } else {
          console.log('received venues', data);
          this.setState({ points: data.response.categories, searching: false });
        }
      }, (error) => {
        console.log('error searching points', error);
        this.setState({ searching: false });
      }); */
  }

  render() {
    const { viewport, points, searching } = this.state;

    return (
      <div className="App">
        <SearchBar locked={ searching } onSearch={ this.handleSearch } />
        <Map viewport={ viewport } points={ points } onViewportChange={ (viewport) => !searching && this.setState({ viewport }) } />
      </div>
    );
  }
}

export default App;
