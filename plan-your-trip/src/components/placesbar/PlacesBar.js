import React, { Component } from 'react';

export default class PlacesBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searching: false,
      searchText: ''
    }
  }

  render() {
    const { searching, searchText } = this.state;

    return (<div id="placesbar">
      <form className="placesbar-form" onSubmit={ this.handleSubmit }>
        <input type="search" value={ searchText } placeholder="donde..."
          onFocus={ this.toggleSearch }
          onKeyDown={ this.handleKeyDown }
          onChange={ (evt) => !this.props.locked && this.setState({ searchText: evt.target.value }) } />
        <button type="submit">Buscar</button>
      </form>
    </div>)
  }
}
