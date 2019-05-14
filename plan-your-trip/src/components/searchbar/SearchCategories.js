import React, { Component } from 'react';
import classNames from 'classnames';

import VenuesController from '../../controllers/venues.controller';

import Loader from '../loader/Loader';

export default class SearchCategories extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rawData: [],
      loading: true
    };

    VenuesController.getCategories()
      .then((data) => {
        this.setState({ rawData: data || [], loading: false });
      }, (error) => {
        console.log('error loading venues categories', error);
        this.setState({ loading: false });
      });
  }

  categoryIconSize = 64;

  numOfCategoryColumns = 3;

  onCategoryClicked = (categoryId) => (evt) => {
    const { onCategorySelect } = this.props;

    if (typeof onCategorySelect === 'function') {
      onCategorySelect(categoryId);
    }
  }

  render() {
    const { rawData, loading } = this.state;
    let { selectedCategories, firstLevel = null, secondLevel = null, thirdLevel = null } = this.props;

    if (firstLevel == null && rawData.length > 0) {
      firstLevel = rawData[0].id;
    }

    // categories grouping in 3 columns
    const columLimit = rawData.length / this.numOfCategoryColumns;

    const categories = rawData.reduce((tot, curr, i) => {
      tot[i % this.numOfCategoryColumns].push(curr);
      return tot;
    }, Array.from({length: this.numOfCategoryColumns}, () => []));

    return (
      <div className="searchbar-content">
        <h2>Categorías</h2>
        { loading ? (<Loader />) : (
          categories.map((categoryList, i) => (
            <div key={i}  className="searchbar-categories">
              { categoryList.map((category, j) => (<div key={ j } className={ classNames("searchbar-category", {
                'selected': selectedCategories.indexOf(category.id) !== -1
              }) } onClick={ this.onCategoryClicked(category.id) }>
                  <img className={ "round" } src={ category.icon.buildUrl(this.categoryIconSize) } alt={ category.name } />
                  <h3>{ category.name }</h3>
                </div>)) }
            </div>
          )))
        }
      </div>
    );
  }

}
