
export default class VenueContact {

  constructor(data = {}) {
    this._phone = data.phone || null;
    this._formattedPhone = data.formattedPhone || null;
    this._twitter = data.twitter || null;
    this._instagram = data.instagram || null;
    this._facebook = data.facebook || null;
    this._facebookUsername = data.facebookUsername || null;
    this._facebookName = data.facebookName || null;
  }

  get phone() {
    return this._phone;
  }

  set phone(phone) {
    this._phone = phone;
  }

  get formattedPhone() {
    return this._formattedPhone;
  }

  set formattedPhone(formattedPhone) {
    this._formattedPhone = formattedPhone;
  }

  get twitter() {
    return this._twitter;
  }

  set twitter(twitter) {
    this._twitter = twitter;
  }

  get instagram() {
    return this._instagram;
  }

  set instagram(instagram) {
    this._instagram = instagram;
  }

  get facebook() {
    return this._facebook;
  }

  set facebook(facebook) {
    this._facebook = facebook;
  }

  get facebookUsername() {
    return this._facebookUsername;
  }

  set facebookUsername(facebookUsername) {
    this._facebookUsername = facebookUsername;
  }

  get facebookName() {
    return this._facebookName;
  }

  set facebookName(facebookName) {
    this._facebookName = facebookName;
  }
  
}
