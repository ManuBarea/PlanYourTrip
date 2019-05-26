import React, { Component } from 'react';

import VenuesController from '../../controllers/venues.controller';
var debug = 0;
export default class VenueDetailContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      venue: props.venue
    }
  }

  fetchVenuePhoto(venue) {
    if (debug === 3) {
      console.error('max call stack')
      return false;
    }
    VenuesController.getVenueDetails(venue.id)
      .then((data) => {
        console.log('data', data);
        debug ++;
        this.setState({ loading: false, venue: data });
      }, (error) => {
        console.log('error fetching venue photos', error);
        debug ++;
        this.setState({ loading: false, venue: venue });
      });
  }

  componentDidMount() {
    this.fetchVenuePhoto(this.props.venue);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.venueImages === null /*|| nextProps.venue.id !== this.state.venue.id*/) {
      if (!this.state.loading) {
        this.setState({ loading: true })
        this.fetchVenuePhoto(nextProps.venue);
      }
    }
  }

  render() {
    const { venue } = this.state;

    const backgroundPhoto = venue.photos.length ? venue.photos[0] : null;

    if (backgroundPhoto !== null) {
      console.log('backgroundPhoto', backgroundPhoto.buildUrl(backgroundPhoto.width));
    }

    return (<div className="VenueDetailContent" style={{ backgroundImage: backgroundPhoto !== null ? `url(${backgroundPhoto.buildUrl(backgroundPhoto.width)})` : null }}>
      <div className="header">
        <h1>{ venue.name }</h1>
        <button onClick={ (evt) => typeof this.props.onCloseClick === 'function' && this.props.onCloseClick(evt) }>Cerrar</button>
      </div>

      <div className="content">
        { venue.categories.length && venue.categories.map((category, i) => (<div key={i} className="category">
          <img src={ category.icon.buildUrl(64) } title={ category.name } />
          <span>{ category.name }</span>
        </div>)) }
      </div>

      { venue.contact != null &&
        (<div className="content info">
          <div className="key-value-pair">
            <span className="key">Teléfono</span>
            <span className="value">{ venue.contact.phone || '-' }</span>
          </div>
          <div className="key-value-pair">
            <span className="key">Twitter</span>
            <span className="value">{ venue.contact.twitter || '-' }</span>
          </div>
          <div className="key-value-pair">
            <span className="key">Instagram</span>
            <span className="value">{ venue.contact.instagram || '-' }</span>
          </div>
          <div className="key-value-pair">
            <span className="key">Facebook</span>
            <span className="value">{ venue.contact.facebook || '-' }</span>
          </div>
        </div>) }
    </div>);
  }
}
