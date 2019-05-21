
export default class Place {

  constructor(data = {}) {
    this._bbox = data.bbox || null;
    this._center = data.center || null;
    this._geometry = data.geometry || null;
    this._id = data.id || null;
    this._type = data.place_type && data.place_type.length ? data.place_type[0] : null;

    if (typeof data.place_name_es === 'string') {
      this._name = data.place_name_es;
    } else if (typeof data.place_name === 'string') {
      this._name = data.place_name;
    } else {
      this._name = null;
    }
  }

  set bbox(bbox) {
    this._bbox = bbox;
  }

  get bbox() {
    return this._bbox;
  }

  set center(center) {
    this._center = center;
  }

  get center() {
    return this._center;
  }

  set geometry(geometry) {
    this._geometry = geometry;
  }

  get geometry() {
    return this._geometry;
  }

  set id(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set type(type) {
    this._type = type;
  }

  get type() {
    return this._type;
  }

  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }
}

/*

bbox: [123.018417358398, 10.7224397659302, 123.079803466797, 10.7719898223878] (4)

center: [123.0377, 10.7421] (2)

context: [{id: "postcode.9320346552060150", text_es: "6116", text: "6116"}, Object, Object, Object] (4)

geometry: {type: "Point", coordinates: [123.0377, 10.7421]}

id: "locality.12519583179744000"

place_name: "Dos Hermanas, Talisay, Negros Occidental, Filipinas"

place_name_es: "Dos Hermanas, Talisay, Negros Occidental, Filipinas"

place_type: ["locality"] (1)

properties: {}

relevance: 0.96

text: "Dos Hermanas"

text_es: "Dos Hermanas"

type: "Feature"
*/
