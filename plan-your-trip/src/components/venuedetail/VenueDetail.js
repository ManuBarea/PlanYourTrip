import React, { Component } from 'react';

import './VenueDetail.scss';

import Dispatcher from '../../mixins/dispatcher';
import VenuesController from '../../controllers/venues.controller';
import VenueDetailContent from './VenueDetailContent';
import VenueDetailMedia from './VenueDetailMedia';

export default class VenueDetail extends Component {

  constructor(props) {
    super(props);
  }

  closePane = () => {
    Dispatcher.dispatch('venue::details::close');
  }

  render() {
    const { venue } = this.props;

    return (<div className="VenueDetail">
      <VenueDetailContent venue={ venue } onCloseClick={ this.closePane } />
      <VenueDetailMedia venue={ venue } />
    </div>);
  }

}
