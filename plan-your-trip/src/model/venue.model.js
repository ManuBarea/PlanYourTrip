import VenueLocation from './venue-location.model';
import Category from './category.model';


export default class Venue {

  constructor(data = {}) {
    this._id = data.id || null;
    this._name = data.name || null;
    this._location = data.location != null ? new VenueLocation(data.location) : null;
    this._categories = data.categories != null ? data.categories.map(category => new Category(category)) : [];
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
}
