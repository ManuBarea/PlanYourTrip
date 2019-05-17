import PlacesClient from '../client/places.client';

export default class PlacesController {

  search(query) {
    return new Promise((resolve, reject) => {
      PlacesClient.search(query)
        .then((data) => {
          console.log('success', data);
        })
        .catch(error => reject(error));
    })
  }

}
