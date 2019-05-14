import React, { Component } from 'react';
import classNames from 'classnames';

import './SearchBar.scss';

import SearchCategories from './SearchCategories';

//import Dispatcher from '../mixins/dispatcher';

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
    if (this.props.locked || (evt.type.toLowerCase() === 'focus' && this.state.opened)) {
      return false;
    }

    if (this.state.opened) {
      this.setState({ opened: false });
    } else {
      this.setState({ opened: true });
    }
  }

  handleKeyDown = (evt) => {
    if (this.props.locked) {
      return false;
    }

    const keyCode = evt.keyCode || evt.which;
    // console.log('keydown event handled', keyCode, evt.key, evt.type, evt);
    if (keyCode === 27 && this.state.opened) {
      this.toggleSearch(evt);
    }
  }

  handleCategorySelect = (category) => {
    if (this.props.locked) {
      return false;
    }

    let { categories } = this.state;
    let index = categories.indexOf(category);

    if (index === -1) {
      this.setState({ categories: categories.concat(category) });
    } else {
      categories.splice(index, 1);
      this.setState({ categories: categories });
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    if (this.props.locked || !this.state.opened) {
      return false;
    }
    const { onSearch } = this.props;
    const { searchText, categories } = this.state;

    this.setState({ opened: false });

    if (typeof onSearch === 'function') {
      onSearch({
        query: searchText,
        categories: categories
      });
    }

    /*Dispather.dispatch('search:venues', {
      query: searchText,
      categories: categories
    });*/
  }

  render() {
    const { opened, searchText, categories } = this.state;

    return (
      <div id="searchbar" className={ classNames({
        'opened': opened
      }) }>
        <form className="searchbar-form" onSubmit={ this.handleSubmit }>
          <input type="search" value={ searchText } placeholder="buscar..."
            onFocus={ this.toggleSearch }
            onKeyDown={ this.handleKeyDown }
            onChange={ (evt) => !this.props.locked && this.setState({ searchText: evt.target.value }) } />
          <button type="submit">Buscar</button>
        </form>

        <SearchCategories selectedCategories={ categories } onCategorySelect={ this.handleCategorySelect } />

        { /* close button */ }
        <span onClick={ this.toggleSearch } className="searchbar-close"></span>
      </div>
    );
  }
}
