import BaseClient from './base-client';
import { FlickerCredential } from '../configuration';

export class PhotosClient extends BaseClient {

  constructor() {
    super('https://api.flickr.com/services/rest/');
  }

//String url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+ 
// FLICKR_API_KEY +"&tags=" + artist +"&per_page=5&page=1&format=json&nojsoncallback=1" ;

 search(query) {
    let queryParams = JSON.parse(JSON.stringify(FlickerCredential));
      queryParams.query = query;
      queryParams.perPage = '5';
      queryParams.page = '1';
      queryParams.format = 'json&nojsoncallback=1'

    return this.get('?method=flickr.photos.getRecent', queryParams, null);
  }
}

export default new PhotosClient();
