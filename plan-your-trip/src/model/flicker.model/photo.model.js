
export default class Photo {

    constructor(data = {}) {
      this._id = data.id || null;
      this._farm = data.farm|| null;
      this._serverid = data.server || null;
      this._secret = data.secret || null;
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