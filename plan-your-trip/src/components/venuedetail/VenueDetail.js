import React, { Component } from 'react';

import Dispatcher from '../../mixins/dispatcher';

import './VenueDetail.scss';

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
      <div className="header">
        <h1>{ venue.name }</h1>
        <button onClick={ this.closePane }>Cerrar</button>
      </div>
      <div className="content">
        { venue.categories.length && venue.categories.map((category, i) => (<div key={i}>
          <img src={ category.icon.buildUrl(64) } title={ category.name } />
        </div>)) }
      </div>
    </div>);
  }

}
