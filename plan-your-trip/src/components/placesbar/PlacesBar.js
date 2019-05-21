import React, { Component } from 'react';

import './PlacesBar.scss';

export default class PlacesBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searching: false,
      searchText: ''
    }
  }

  handleKeyDown = (evt) => {
    if (this.props.locked) {
      return false;
    }

    const keyCode = evt.keyCode || evt.which;
    //console.log('keydown event handled', keyCode, evt.key, evt.type, evt);
    if (keyCode === 13) {
      this.handleSubmit(evt);
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    if (this.props.locked) {
      return false;
    }
    const { onSelect } = this.props;
    const { searchText } = this.state;


    if (typeof onSelect === 'function') {
      console.log('onSelect', searchText)
      onSelect({
        query: searchText
      });
    }
  }

  render() {
    const { searching, searchText } = this.state;

    return (<div id="placesbar">
      <form className="placesbar-form" onSubmit={ this.handleSubmit }>
        <input type="search" value={ searchText } placeholder="donde..."
          onKeyDown={ this.handleKeyDown }
          onChange={ (evt) => !this.props.locked && this.setState({ searchText: evt.target.value }) } />
      </form>
    </div>)
  }
}
