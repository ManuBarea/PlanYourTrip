import BaseClient from './base-client';
import { MapboxToken } from '../configuration';

export class PlacesClient extends BaseClient {

  constructor() {
    super('https://api.mapbox.com/geocoding/v5/mapbox.places/');
  }

  search(query) {
    let queryParams = {
      'access_token': MapboxToken
    };

    return this.get(`{query}.json`, queryParams, null);
  }

}
