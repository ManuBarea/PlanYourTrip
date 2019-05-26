
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
