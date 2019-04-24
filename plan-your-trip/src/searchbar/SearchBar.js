import React, { Component } from 'react';
import classNames from 'classnames';

import './SearchBar.scss';

import SearchCategories from './SearchCategories';

export default class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      searchText: ''
    }
  }

  toggleSearch = (evt) => {
    if (evt.type.toLowerCase() === 'focus' && this.state.opened) {
      return false;
    }

    if (this.state.opened) {
      this.setState({ opened: false });
    } else {
      this.setState({ opened: true });
    }
  }

  handleKeyDown = (evt) => {
    const keyCode = evt.keyCode || evt.which;
    console.log('keydown event handled', keyCode, evt.key, evt.type, evt);
    if (keyCode === 27 && this.state.opened) {
      this.toggleSearch(evt);
    }
  }

  render() {
    const { opened, searchText } = this.state;

    return (
      <div id="searchbar" className={ classNames({
        'opened': opened
      }) }>
        <form className="searchbar-form">
          <input type="search" value={ searchText } placeholder="buscar..."
            onFocus={ this.toggleSearch }
            onKeyDown={ this.handleKeyDown }
            onChange={ (evt) => this.setState({ searchText: evt.target.value }) } />
          <button type="submit">Buscar</button>
        </form>

        <SearchCategories />

        { /* close button */ }
        <span onClick={ this.toggleSearch } className="searchbar-close"></span>
      </div>
    );
  }
}
