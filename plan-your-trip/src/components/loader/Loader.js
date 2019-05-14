import React, { Component } from 'react';

import './Loader.scss';

export default class Loader extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="Loader-lds-ripple">
        <div></div>
        <div></div>
      </div>
    );
  }
}
