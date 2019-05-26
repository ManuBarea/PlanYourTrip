import BaseClient from './base-client';
import { FoursquareCredentials } from '../configuration';

// https://developer.foursquare.com/docs/api/endpoints

export class UserClient extends BaseClient {

  constructor() {
    super('https://api.foursquare.com/v2');
  }

  getUserInfo(accessToken) {
    let params = {
      'v': FoursquareCredentials.v,
      'oauth_token': accessToken
    }
    return this.get('/users/self', params, null);
  }

  createList(accessToken, userId, name) {
    let params = {
      'v': FoursquareCredentials.v,
      'oauth_token': accessToken,
      name: name
    }
    return this.post('/lists/add', params, null);
  }

}

export default new UserClient();
