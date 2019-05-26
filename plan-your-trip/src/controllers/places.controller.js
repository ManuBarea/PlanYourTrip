import PlacesClient from '../client/places.client';

import Place from '../model/place';

const typesWeight = ['country', 'region', 'postcode', 'district', 'place', 'locality', 'neighborhood'];

export default class PlacesController {

  static search(query) {
    return new Promise((resolve, reject) => {
      PlacesClient.search(query)
        .then((data) => {
          if (data.features && data.features.length) {
            let sorted = data.features
              .map(feature => new Place(feature))
              .filter(feature => feature.type !== null)
              // ordenar por peso
              .sort((f1, f2) => typesWeight.indexOf(f1.type) - typesWeight.indexOf(f2.type));
            if (sorted.length) {
              resolve(sorted[0]);
            } else {
              reject(new Error('no place found with query ', query));
            }
          } else {
            reject(new Error('invalid response data: response doesn\'t match with expected format.'))
          }
        })
        .catch(error => reject(error));
    })
  }

}
