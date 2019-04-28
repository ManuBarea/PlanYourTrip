import React, { Component } from 'react';
import classNames from 'classnames';

import VenuesClient from '../client/venue-client';

import Loader from '../loader/Loader';


const getCategories = (categories, parentIds = [], level = 0) => {
  let category = null;
  if (parentIds.length > 0) {
    category = categories.find(category => category.id === parentIds[level]);
  }

  if (category == null) {
    return categories;
  } else {
    return getCategories(category.categories, parentIds, level + 1);
  }
}

export default class SearchCategories extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rawData: [],
      loading: true
    };

    VenuesClient.getCategories()
      .then((data) => {
        if (!data.meta || data.meta.code !== 200) {
          console.log('invalid service response', data);
          this.setState({ loading: false });
        } else {
          console.log('received venues categories', data);
          this.setState({ rawData: data.response.categories, loading: false });
        }
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

    if (firstLevel === null && rawData.length > 0) {
      firstLevel = rawData[0].id;
    }

    // categories grouping in 3 columns
    const columLimit = rawData.length / this.numOfCategoryColumns;

    const initCategories = [];

    const categories = rawData.reduce((tot, curr, i) => {
      tot[i % this.numOfCategoryColumns].push(curr);
      return tot;
    }, Array.from({length: this.numOfCategoryColumns}, () => []));

    console.log('categories', categories);

    return (
      <div className="searchbar-content">
        <h2>Categorías</h2>
        { loading ? (<Loader />) : (
          categories.map((categoryList, i) => (
            <div key={i}  className="searchbar-categories">
              { categoryList.map((category, j) => (<div key={ j } className={ classNames("searchbar-category", {
                'selected': selectedCategories.indexOf(category.id) !== -1
              }) } onClick={ this.onCategoryClicked(category.id) }>
                  <img className={ "round" } src={ category.icon.prefix + this.categoryIconSize + category.icon.suffix } alt={ category.name } />
                  <h3>{ category.name }</h3>
                </div>)) }
            </div>
          )))
        }
      </div>
    );
  }

}
