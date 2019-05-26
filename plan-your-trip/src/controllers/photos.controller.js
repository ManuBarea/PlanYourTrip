import PhotosClient from '../client/photos.client';

import Photo from '../model/media';

export default class PhotosController {

    static search(query, lat, lng) {
      return new Promise((resolve, reject) => {
        PhotosClient.search(query, lat, lng)
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
