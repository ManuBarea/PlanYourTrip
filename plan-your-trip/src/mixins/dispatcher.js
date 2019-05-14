
export class Dispatcher {

  constructor() {
    this.events = {};
  }

  on(evt, callback) {
    if (typeof callback !== 'function') {
      throw new Error('the listener callback must be a function');
    }
    if (typeof evt !== 'string') {
      throw new Error('the event name must be a string');
    }

    if (this.events[evt] === undefined) {
      this.events[evt] = {
        listeners: []
      }
    }

    this.events[evt].listeners.push(callback);
  }

  un(evt, callback) {
    if (this.events[evt] === undefined) {
      return false;
    }

    this.events[evt].listeners = this.events[evt].listeners
      .filter(listener => listener.toString() !== callback.toString());
  }

  dispatch(evt, data) {
    if (this.events[evt] === undefined) {
      return false;
    }
    this.events[evt].listeners.forEach(listener => listener(data));
  }

}

const _instance = new Dispatcher();

export default _instance;
