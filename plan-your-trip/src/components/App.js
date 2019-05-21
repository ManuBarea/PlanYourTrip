import React, { Component } from 'react';
import WebMercatorViewport from 'viewport-mercator-project';

import Map from './map/Map';
import SearchBar from './searchbar/SearchBar';
import PlacesBar from './placesbar/PlacesBar';

import VenuesController from '../controllers/venues.controller';
import PlacesController from '../controllers/places.controller';

import './App.css';

const getBounds = (coords = []) => coords.reduce((tot, curr) => {
  let [nw, se] = [tot[0] || [], tot[1] || []];

  if (nw.length < 1) {
    nw[0] = curr.lng;
    se[0] = curr.lng;
  } else if (curr.lng < nw[0]) {
    nw[0] = curr.lng;
  } else if (curr.lng > se[0]){
    se[0] = curr.lng;
  }

  if (nw.length < 2) {
    nw[1] = curr.lat;
    se[1] = curr.lat;
  } else if (curr.lat < nw[1]) {
    nw[1] = curr.lat;
  } else if (curr.lat > se[1]){
    se[1] = curr.lat;
  }

  return [nw, se];
}, []);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: 39.772175,
        longitude: -4.074039,
        zoom: 6
      },
      place: null,
      venues:[],
      searching: false
    }
  }

  handleSearch = (searchData) => {
    this.setState({ searching: true });

    let query = searchData.query;
    let categories = searchData.categories;
    let { viewport, place } = this.state;

    VenuesController.search(query, categories, [viewport.latitude, viewport.longitude])
      .then((data) => {
        console.log('data', data);


        if (data.venues.length) {

          const bounds = getBounds(data.venues.map(entry => ({
            lat: entry.location.lat,
            lng: entry.location.lng
          })));

          const nextViewport = new WebMercatorViewport(this.state.viewport)
              .fitBounds(bounds, {
                padding: 20,
                offset: [0, -100]
              });

          var { longitude, latitude, zoom, width, height} = nextViewport;
        } else {
          var { latitude, longitude, width, height, zoom } = this.state.viewport;
        }
        this.setState({
          venues: data.venues.map(entry=> ({
            latitude: entry.location.lat,
            longitude: entry.location.lng
          })),
          searching: false,
          viewport: {
            latitude: latitude,
            longitude: longitude,
            width: width,
            height: height,
            zoom: zoom
          }
        });
      }, (error) => {
        console.log('error searching points', error);
        this.setState({ searching: false });
      });
  }

  handlePlaceSelect = (searchData) => {
    this.setState({ searching: true });

    let query = searchData.query;

    PlacesController.search(query)
      .then((place) => {
        console.log('found place', place);
        let bbox = place.bbox;
        let bounds = getBounds([{lng:bbox[0],lat: bbox[1]}, {lng:bbox[2],lat: bbox[3]}])
        const {longitude, latitude, zoom, width, height} = new WebMercatorViewport(this.state.viewport)
            .fitBounds(bounds, {
              padding: 20,
              offset: [0, -100]
            });

            console.log('width ', width, 'height', height)
        this.setState({ searching: false,
          place_error: false,
          place: place,
          viewport: {
            longitude: longitude,
            latitude: latitude,
            zoom: zoom,
            width: width,
            height: height
            //bounds: place.bbox
        }});
      }, (error) => {
        console.log('error searching places', error);
        this.setState({ searching: false, place_error: true });
      })
  }

  render() {
    const { viewport, venues, searching } = this.state;

    return (
      <div className="App">
        <SearchBar locked={ searching } onSearch={ this.handleSearch } />
        <PlacesBar locked={ searching } onSelect={ this.handlePlaceSelect } />
        <Map viewport={ viewport } points={ venues } onViewportChange={ (viewport) => !searching && this.setState({ viewport }) } />
      </div>
    );
  }
}

export default App;
