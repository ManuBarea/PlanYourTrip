import VenueLocation from './venue-location.model';
import VenuePhoto from './venue-photo.model';
import VenueCategory from './venue-category.model';
import VenueContact from './venue-contact.model';

const extractVenuePhotos = (photosObject, ...types) => {
  let result = [];
  if (photosObject != null) {
    photosObject.groups
      .filter(group => !types.length || types.indexOf(group.type) !== -1)
      .flatMap(group => group.items)
      .forEach(item => {
        if (!result.some(it => it.id === item.id)) {
          result.push(item);
        }
      })
  }
  return result.map(data => new VenuePhoto(data));
}


export default class Venue {

  constructor(data = {}) {
    this._id = data.id || null;
    this._name = data.name || null;
    this._location = data.location != null ? new VenueLocation(data.location) : null;
    this._categories = data.categories != null ? data.categories.map(category => new VenueCategory(category)) : [];
    this._photos = extractVenuePhotos(data.photos);
    this._contact = data.contact != null ? new VenueContact(data.contact) : null;
  }

  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set id(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set location(location) {
    this._location = location;
  }

  get location() {
    return this._location;
  }

  set categories(categories) {
    this._categories = categories;
  }

  get categories() {
    return this._categories;
  }

  set photos(photos) {
    this._photos = photos;
  }

  get photos() {
    return this._photos;
  }

  set contact(contact) {
    this._contact = contact;
  }

  get contact() {
    return this._contact;
  }
}
