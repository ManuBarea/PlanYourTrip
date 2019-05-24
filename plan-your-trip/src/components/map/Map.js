import React, { Component } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';

import { MapboxToken } from '../../configuration';

import Pin from '../marker/Pin';

import Dispatcher from '../../mixins/dispatcher';

export default class Map extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { width, height, viewport, venues, onViewportChange } = this.props;

    return (
      <ReactMapGL { ...viewport }
        mapboxApiAccessToken={ MapboxToken }
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v10"
        onViewportChange={ (viewport) => {
          if (typeof onViewportChange === 'function') {
            onViewportChange(viewport);
          }
        }}
      >
        { venues.length > 0 && venues.map((venue, i) => (
          <Marker key={ i }
            latitude={ venue.location.lat }
            longitude={ venue.location.lng }
            offsetTop={ -20 }
            offsetLeft={ -10 }
          >
            <Pin size={ 20 } onClick={ (evt) => Dispatcher.dispatch('venue::details::open', { id: venue.id }) } />
          </Marker>
        ))  }
        { /*<Marker
          latitude={ 39.772175 }
          longitude={ -4.074039 }
          offsetTop={ -20 }
          offsetLeft={ -10 }
          >
          <Pin size={ 20 } />
        </Marker> */ }
      </ReactMapGL>
    );
  }


}
