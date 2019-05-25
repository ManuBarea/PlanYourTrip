import PhotosClient from '../client/photos.client';

import Photos from '../model/flicker.model/photos.model';
import Photo from '../model/flicker.model/photo.model';

export default class PhotosController {

    static search(query) {
      return new Promise((resolve, reject) => {
        PhotosClient.search(query)
          .then((data) => {
            if (!data.stat || data.stat !== 'ok') {
              reject(new Error('invalid response status'));
            } else {
              console.log('received photos', data);
              resolve(data.photos.photo.map(photo => new Photo(photo)));
            }
          })
          .catch((error) => reject(error));
      })
    }
}