export default class VenuePhoto{

    constructor(data = {}) {
      this._id = data.id || null;
      this._prefix = data.prefix || null;
      this._sufix= data.sufix || null;
     
    }
  
    
    get id() {
      return this._id;
    }
    get prefix() {
        return this._prefix;
    }
    get sufix() {
       return this._sufix;
    }
}
  