

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
