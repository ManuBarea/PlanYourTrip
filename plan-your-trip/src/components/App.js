import React, { Component } from 'react';
import { FlyToInterpolator } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';

import Map from './map/Map';
import SearchBar from './searchbar/SearchBar';
import PlacesBar from './placesbar/PlacesBar';
import VenueDetail from './venuedetail/VenueDetail';
import Login from './login/Login';
import Lists from './lists/Lists';

import VenuesController from '../controllers/venues.controller';
import PlacesController from '../controllers/places.controller';
import UserController from '../controllers/user.controller';

import Dispatcher from '../mixins/dispatcher';

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
      placeText: null,
      venues:[],
      searching: false,
      venueDetail: null
    }

    Dispatcher.on('venue::details::open', (data) => {
      console.log('displaying venue details', data)
      this.setState({ venueDetail: data.id });
    });

    Dispatcher.on('venue::details::close', () => {
        this.setState({ venueDetail: null });
    });
  }

  handleSearchError = (error) => {

  }

  handleSearch = (searchData) => {
    this.setState({ searching: true, venueDetail: null });

    let query = searchData.query;
    let placeQuery = searchData.place;
    let categories = searchData.categories;
    let { viewport, place, placeText } = this.state;

    if (typeof placeQuery === 'string' && placeQuery !== '') {
      new Promise((resolve, reject) => {
        if (placeQuery === placeText && place != null) {
          resolve(place);
        } else {
          PlacesController.search(placeQuery)
            .then((place) => {
              resolve(place)
            }, error => reject(error));
        }
      })
        .then(place => this.searchVenues(query, categories, [place.center[1], place.center[0]], place, placeText))
        .catch(this.handleSearchError);
    } else {
      this.searchVenues(query, categories, [viewport.latitude, viewport.longitude], null, null);
    }
  }

  searchVenues = (query, categories, center, place, placeText) => {
    let { viewport } = this.state;

    VenuesController.search(query, categories, center)
      .then((data) => {
        console.log('data', data);

        let nextState = {
          place: place,
          placeText: placeText,
          searching: false,
          venues: data,
          viewport: viewport
        };

        if (data.length) {
          const bounds = getBounds(data.map(entry => ({
            lat: entry.location.lat,
            lng: entry.location.lng
          })));
          const nextViewport = new WebMercatorViewport(viewport)
              .fitBounds(bounds, {
                padding: 20,
                offset: [0, -100]
              });
          nextState.viewport = {
            ...nextViewport,
            transitionInterpolator: new FlyToInterpolator(),
            transitionDuration: 2000
          };
        } else {
          nextState.viewport.latitude = center[0];
          nextState.viewport.longitde = center[1];
        }

        this.setState(nextState);

      }, (error) => {
        console.log('error searching points', error);
        this.setState({ searching: false });
      });
  }

  render() {
    const { viewport, venues, searching, venueDetail } = this.state;

    return (
      <div className="App">
        <Login />
        <Lists />
        <SearchBar locked={ searching } onSearch={ this.handleSearch } />
        { /*<PlacesBar locked={ searching } onSelect={ this.handlePlaceSelect } />*/ }
        <Map viewport={ viewport } venues={ venues } onViewportChange={ (viewport) => !searching && this.setState({ viewport }) } />
        { venueDetail != null && (<VenueDetail venue={ venues.find(venue => venue.id === venueDetail) } />) }
      </div>
    );
  }
}

export default App;
