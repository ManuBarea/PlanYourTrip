import BaseClient from './base-client';
import { FoursquareCredentials } from '../configuration';

// https://developer.foursquare.com/docs/api/endpoints

export class OAuthClient extends BaseClient {

  constructor() {
    super('https://foursquare.com/oauth2');
  }

  getLoginUrl() {
    return `${this.url}/authenticate?client_id=${FoursquareCredentials.client_id}&response_type=code&redirect_uri=${FoursquareCredentials.redirect_uri}`;
  }

}

export default new OAuthClient();
