import React, { Component } from 'react';
import classNames from 'classnames';

import PhotosController from '../../controllers/photos.controller';

import Loader from '../loader/Loader';

export default class VenueDetailMedia extends Component {

  constructor(props) {
    super(props);

    this.state = {
      venue: null,
      photos: [],
      loading: true
    };

  }

  fetchMedia(venue) {
    PhotosController.search(venue.name, venue.location.lat, venue.location.lng)
      .then((data) => {
        this.setState({ photos: data || [], loading: false, venue: venue });
      }, (error) => {
        this.setState({ loading: false, venue: venue });
      });
  }

  componentDidMount() {
    this.fetchMedia(this.props.venue);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.venue === null || nextProps.venue.id !== this.state.venue.id) {
      if (!this.state.loading) {
        this.setState({ loading: true })
        this.fetchMedia(nextProps.venue);
      }
    }
  }

  render() {
    const { photos, loading, venue } = this.state;
    return (<div className="VenueDetailMedia">
        { loading ? (<Loader />) : (photos.map((photo, i) => {
          return (<img key={i} src={ photo.getUrl() } />)
        })) }
      </div>);
  }


}
