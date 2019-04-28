import React, { Component } from 'react';
import classNames from 'classnames';

import './SearchBar.scss';

import SearchCategories from './SearchCategories';

import VenuesClient from '../client/venue-client';

export default class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      searching: false,
      searchText: '',
      categories: []
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
    // console.log('keydown event handled', keyCode, evt.key, evt.type, evt);
    if (keyCode === 27 && this.state.opened) {
      this.toggleSearch(evt);
    }
  }

  handleCategorySelect = (category) => {
    let { categories } = this.state;
    let index = categories.indexOf(category);

    if (index === -1) {
      this.setState({ categories: categories.concat(category) });
    } else {
      categories.splice(index, 1);
      this.setState({ categories: categories });
    }
  }

  handleSearchClick = () => {
    if (!this.state.opened) {
      return false;
    }
    const { onSearch } = this.props;
    const { searchText, categories } = this.state;

    this.setState({ opened: false });

    if (typeof onSearch === 'function') {
      onSearch({ query: searchText, categories });
    }
  }

  render() {
    const { opened, searchText, categories } = this.state;

    return (
      <div id="searchbar" className={ classNames({
        'opened': opened
      }) }>
        <form className="searchbar-form">
          <input type="search" value={ searchText } placeholder="buscar..."
            onFocus={ this.toggleSearch }
            onKeyDown={ this.handleKeyDown }
            onChange={ (evt) => this.setState({ searchText: evt.target.value }) } />
          <button type="submit" onClick={ this.handleSearchClick }>Buscar</button>
        </form>

        <SearchCategories selectedCategories={ categories } onCategorySelect={ this.handleCategorySelect } />

        { /* close button */ }
        <span onClick={ this.toggleSearch } className="searchbar-close"></span>
      </div>
    );
  }
}
