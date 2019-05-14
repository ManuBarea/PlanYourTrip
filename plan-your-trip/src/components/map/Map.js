import React, { Component } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';

import { MapboxToken } from '../../configuration';

import Pin from '../marker/Pin';

export default class Map extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { width, height, viewport, points, onViewportChange } = this.props;

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
        { points.length > 0 && points.map((point, i) => (
          <Marker key={ i }
            latitude={ point.latitude }
            longitude={ point.longitude }
            offsetTop={ -20 }
            offsetLeft={ -10 }
          >
            <Pin size={ 20 } />
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
