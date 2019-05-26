
export default class Photo {

    constructor(data = {}) {
      this._id = data.id || null;
      this._farm = data.farm|| null;
      this._serverid = data.server || null;
      this._secret = data.secret || null;
    }

    getUrl() {
      //"https://farm"+ photos[0].farm + ".staticflickr.com/"+photos[0].serverid+'/'+photos[0].id+'_'+photos[0].secret+'_m.jpg'
      return `https://farm${this.farm}.staticflickr.com/${this.serverid}/${this.id}_${this.secret}_m.jpg`;
    }

    get id() {
      return this._id;
    }

    get farm(){
      return this._farm;
    }
    get serverid(){
      return this._serverid;
    }
    get secret(){
      return this._secret;
    }
  }
