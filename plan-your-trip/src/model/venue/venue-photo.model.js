import VenueImage from './venue-image.model';

export default class VenuePhoto extends VenueImage {

    constructor(data = {}) {
      super(data);
      this._id = data.id || null;
      this._width = data.width || null;
      this._height = data.height || null;
    }

    get id() {
      return this._id;
    }

    set width(width) {
      this._width = width;
    }

    get width() {
      return this._width;
    }

    set height(height) {
      this._height = height;
    }

    get height() {
      return this._height;
    }
}
