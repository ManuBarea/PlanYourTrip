
export default class UserList {

  constructor(data = {}) {
    this._type = data.type || null;
    this._id = data.id || null;
    this._name = data.name || null;
    this._url = data.canonicalUrl || null;
  }

  set type(type) {
    this._type = type;
  }

  get type() {
    return this._type;
  }

  set id(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set url(url) {
    this._url = url;
  }

  get url() {
    return this._url;
  }

}
