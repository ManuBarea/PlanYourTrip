import React, { Component } from 'react';
import classNames from 'classnames';

import './SearchBar.scss';

export default class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      opened: true,
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

        <div className="searchbar-content">
          <h2>Categorías</h2>
          <div className="">

          </div>
          <div className="searchbar-categories">
            <div class="searchbar-category">
              <img class="round" src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" alt="Category thumbnail" />
              <h3>Category</h3>
            </div>
          </div>
        </div>

        { /* close button */ }
        <span onClick={ this.toggleSearch } className="searchbar-close"></span>
      </div>
    );
  }
}
