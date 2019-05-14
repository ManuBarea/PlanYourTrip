

export default class Category {

  constructor(data = {}) {
    this._id = data.id || null;
    this._name = data.name || null;
    this._icon = data.icon || null;
    this._subcategories = data.categories.map(cat => new Category(cat)) || [];
  }

  set id(id) {
    this._id = id;
  }

  get id() {
    return this.id;
  }

  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set icon(icon) {
    this._icon = icon;
  }

  get icon() {
    return this._icon;
  }

  set subcategories(subcategories) {
    this._subcategories = subcategories;
  }

  get subcategories() {
    return this._subcategories;
  }

}
