import BaseClient from './base-client';
import { FoursquareCredentials } from '../configuration';

// https://developer.foursquare.com/docs/api/endpoints

export class ApiClient extends BaseClient {

  constructor() {
    super('http://localhost:8090/api');
  }

  getAccessToken(code) {
    let params = JSON.parse(JSON.stringify(FoursquareCredentials));
    params.grant_type = 'authorization_code';
    params.code = code;

    return this.get('/access_token', params, null);
  }

}

export default new ApiClient();
