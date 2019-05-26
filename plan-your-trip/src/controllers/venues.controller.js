import VenuesClient from '../client/venues.client';

import Venue, { VenueCategory } from '../model/venue';

export default class VenuesController {

    static search(query, categories, center) {
      return new Promise((resolve, reject) => {
        VenuesClient.search(query, categories, center)
          .then((data) => {
            if (!data.meta || data.meta.code !== 200) {
              reject(new Error('invalid response status'));
            } else {
              resolve(data.response.venues.map(venue => new Venue(venue)));
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
              resolve(data.response.categories.map(category => new VenueCategory(category)));
            }
          }, (error) => reject(error));
      });
    }

    static getVenueDetails(venueId) {
      return new Promise((resolve, reject) => {
        VenuesClient.getVenueDetails(venueId)
          .then((data) => {
            if (!data.meta || data.meta.code !== 200) {
              reject(new Error('invalid response status'));
            } else {
              resolve(new Venue(data.response.venue));
            }
          })
          .catch((error) => reject(error));
      })
    }

}
