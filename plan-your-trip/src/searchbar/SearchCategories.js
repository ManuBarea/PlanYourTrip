import React, { Component } from 'react';

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

  onCategoryClicked = (evt) => {

  }

  render() {
    const { rawData, loading } = this.state;
    let { firstLevel = null, secondLevel = null, thirdLevel = null } = this.props;

    if (firstLevel === null && rawData.length > 0) {
      firstLevel = rawData[0].id;
    }

    return (
      <div className="searchbar-content">
        <h2>Categorías</h2>
        { loading ? (<Loader />) : (
          <div className="searchbar-categories">

            <div className="searchbar-category">
              <img className="round" src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" alt="Category thumbnail" />
              <h3>Category</h3>
            </div>
            <div className="searchbar-category">
              <img className="round" src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" alt="Category thumbnail" />
              <h3>Category</h3>
            </div>
            <div className="searchbar-category">
              <img className="round" src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" alt="Category thumbnail" />
              <h3>Category</h3>
            </div>
          </div>
        ) }
      </div>
    );
  }

}
