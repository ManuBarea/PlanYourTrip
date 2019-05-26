

export default class VenueLocation {

  constructor(data = {}) {
    this._address = data.address || null;
    this._lat = data.lat || null;
    this._lng = data.lng || null;
    this._distance = data.distance || null;
    this._postalCode = data.postalCode || null;
    this._countryCode = data.cc || null;
    this._city = data.city || null;
    this._state = data
  }

  set address(address) {
    this._address = address;
  }

  get address() {
    return this._address;
  }

  set lat(lat) {
    this._lat = lat;
  }

  get lat() {
    return this._lat;
  }

  set lng(lng) {
    this._lng = lng;
  }

  get lng() {
    return this._lng;
  }

  set distance(distance) {
    this._distance = distance;
  }

  get distance() {
    return this._distance;
  }

  set postalCode(postalCode) {
    this._postalCode = postalCode;
  }

  get postalCode() {
    return this._postalCode;
  }

  set countryCode(countryCode) {
    this._countryCode = countryCode;
  }

  get countryCode() {
    return this._countryCode;
  }

  set city(city) {
    this._city = city;
  }

  get city() {
    return this._city;
  }

  set state(state) {
    this._state = state;
  }

  get state() {
    return this._state;
  }
}


/*{
  "address": "180 Orchard St",
  "crossStreet": "btwn Houston & Stanton St",
  "lat": 40.72173744277209,
  "lng": -73.98800687282996,
  "labeledLatLngs": [
    {
      "label": "display",
      "lat": 40.72173744277209,
      "lng": -73.98800687282996
    }
  ],
  "distance": 8,
  "postalCode": "10002",
  "cc": "US",
  "city": "New York",
  "state": "NY",
  "country": "United States",
  "formattedAddress": [
    "180 Orchard St (btwn Houston & Stanton St)",
    "New York, NY 10002",
    "United States"
  ]
}*/
