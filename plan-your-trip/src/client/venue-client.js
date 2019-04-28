import BaseClient from './base-client';
import { FoursquareCredentials } from '../configuration';

// https://developer.foursquare.com/docs/api/endpoints

export class VenuesClient extends BaseClient {

  constructor() {
    super('https://api.foursquare.com/v2/venues');

    this._defaultHeaders = {
      'Content-Type': 'application/json;charset=utf-8'
    };
  }

  search(latlng, query, categories) {

  }

  getCategories() {
    return this.get('/categories', FoursquareCredentials, null);
  }


}

export default new VenuesClient();
