import VenueLocation from './venue-location.model';
import Category from './category.model';


export default class Venue {

  constructor(data = {}) {
    this._id = data.id || null;
    this._name = data.name || null;
    this._location = data.location != null ? new VenueLocation(data.location) : null;
    this._categories = data.categories != null ? data.categories.map(category => new Category(category)) : [];
  }

  

}
