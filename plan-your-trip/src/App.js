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
      venues:[],
      searching: false
    }
  }

  handleSearch = (searchData) => {
    this.setState({ searching: true });


    let query = searchData.query;
    let categories = searchData.categories;

    VenuesClient.search( query,categories)
      .then((data) => {
        if (!data.meta || data.meta.code !== 200) {
          console.log('invalid service response', data);
          this.setState({ searching: false });
        } else {
          console.log('received venues', data);
          this.setState({
            venues: data.response.venues.map(entry=> ({
              latitude: entry.location.lat,
              longitude: entry.location.lng
            })),
            searching: false,
            viewport: {
              latitude: data.response.geocode.feature.geometry.center.lat,
              longitude: data.response.geocode.feature.geometry.center.lng,
              zoom: 12
            }
          });
        }
      }, (error) => {
        console.log('error searching points', error);
        this.setState({ searching: false });
      });
  }

  render() {
    const { viewport, venues, searching } = this.state;

    console.log(viewport);

    return (
      <div className="App">
        <SearchBar locked={ searching } onSearch={ this.handleSearch } />
        <Map viewport={ viewport } points={ venues } onViewportChange={ (viewport) => !searching && this.setState({ viewport }) } />
      </div>
    );
  }
}

export default App;
