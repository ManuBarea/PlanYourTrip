import BaseClient from './base-client';
import { FoursquareCredentials } from '../configuration';

const foursquareCredentials = {
  client_id: FoursquareCredentials.client_id,
  client_secret: FoursquareCredentials.client_secret,
  v: FoursquareCredentials.api_version
};

// https://developer.foursquare.com/docs/api/endpoints

export class VenuesClient extends BaseClient {

  constructor() {
    super('https://api.foursquare.com/v2/venues');

    this._defaultHeaders = {
      'Content-Type': 'application/json;charset=utf-8'
    };
  }

  search(latlng) {

  }

  getCategories() {
    return this.get('/categories', FoursquareCredentials, null);
  }


}

export default new VenuesClient();
