import BaseClient from './base-client';
import { FlickerCredential } from '../configuration';

export class PhotosClient extends BaseClient {

  constructor() {
    super('https://api.flickr.com/services/rest/');
  }

//String url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+
// FLICKR_API_KEY +"&tags=" + artist +"&per_page=5&page=1&format=json&nojsoncallback=1" ;

 search(query, lat, lng) {
    let queryParams = JSON.parse(JSON.stringify(FlickerCredential));
    queryParams.text = query;
    queryParams.lat = lat;
    queryParams.lon = lng;
    queryParams.per_page = 5;
    queryParams.page = 1;
    queryParams.format = 'json&nojsoncallback=1';
    queryParams.radius = 2;
    queryParams.content_type = 1;
    queryParams.media = 'photos';

    // queryParams.has_geo = true;

    return this.get('?method=flickr.photos.search', queryParams, null);
  }
}

export default new PhotosClient();
