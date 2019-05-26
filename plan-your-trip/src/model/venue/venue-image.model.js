
export default class VenueImage {

  constructor(data = {}) {
    this._prefix = data.prefix || null;
    this._suffix = data.suffix || null;
  }

  buildUrl(size) {
    return this.prefix + size + this.suffix;
  }

  set prefix(prefix) {
    this._prefix = prefix;
  }

  get prefix() {
    return this._prefix;
  }

  set suffix(suffix) {
    this._suffix = suffix;
  }

  get suffix() {
    return this._suffix;
  }

}
