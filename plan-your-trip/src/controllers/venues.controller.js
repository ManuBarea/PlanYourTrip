import VenuesClient from '../client/venues.client';

import Category from '../model/category.model';
import Venue from '../model/venue.model';

export default class VenuesController {

    static search(query, categories, center) {
      return new Promise((resolve, reject) => {
        VenuesClient.search(query, categories, center)
          .then((data) => {
            if (!data.meta || data.meta.code !== 200) {
              reject(new Error('invalid response status'));
            } else {
              console.log('received venues categories', data);
              resolve(data.response);
            }
          })
          .catch((error) => reject(error));
      })
    }

    static getCategories() {
      return new Promise((resolve, reject) => {
        VenuesClient.getCategories()
          .then((data) => {
            if (!data.meta || data.meta.code !== 200) {
              reject(new Error('invalid response status'));
            } else {
              console.log('received venues categories', data);
              resolve(data.response.categories.map(category => new Category(category)));
            }
          }, (error) => reject(error));
      });
    }

}
