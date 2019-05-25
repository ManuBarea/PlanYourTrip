import Photo from './photo.model';


export default class Photos {

  constructor(data = {}) {

    this._page = data.page || null;
    this._pages = data.pages || null;
    this._perpage = data.perpage || null;
    this._total = data.total || null;
    this._photos= data.photos != null ? data.photos.map(photo => new Photo(photo)) : [];
  }

  set page(page) {
    this._page = page;
  }

  get page() {
    return this._page;
  }

  set pages(pages) {
    this._pages = pages;
  }

  get pages() {
    return this._pages;
  }

  set perpage(perpage) {
    this._perpage = perpage;
  }

  get perpage() {
    return this._perpage;
  }
  set total(total) {
    this._total = total;
  }

  get total() {
    return this._total;
  }

  set photos(photos) {
    this._photos = photos;
  }

  get photos() {
    return this._photos;
  }
}
