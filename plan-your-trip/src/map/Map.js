import React, { Component } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';

import Pin from '../marker/Pin';

export default class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: 39.772175,
        longitude: -4.074039,
        zoom: 6
      }
    };
  }

  render() {
    const { width, height } = this.props;

    const viewport = {...this.state.viewport };

    return (
      <ReactMapGL { ...viewport }
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v10"
        onViewportChange={ (viewport) => this.setState({ viewport }) }
      >
        <Marker
          latitude={ 39.772175 }
          longitude={ -4.074039 }
          offsetTop={ -20 }
          offsetLeft={ -10 }
          >
          <Pin size={ 20 } />
        </Marker>
      </ReactMapGL>
    );
  }


}
