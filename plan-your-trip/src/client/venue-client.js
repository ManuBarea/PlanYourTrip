const foursquareCredentials = {
  client_id: '',
  client_secret: ''
};

// https://developer.foursquare.com/docs/api/endpoints

export default class VenuesClient extends BaseClient {

  constructor() {
    super('https://api.foursquare.com/v2/venues');

    this._defaultHeaders = {
      'Content-Type': 'application/json;charset=utf-8'
    };
  }

  search(latlng) {

  }

  getCategories() {
    return this.get('/categories', foursquareCredentials, this._defaultHeaders);
  }


}
