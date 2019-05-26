import fetch from 'node-fetch';

const addParametersToURL = (url, params) => {
  if (typeof params === 'object') {
    let p = Object.keys(params).map(key => `${key}=${params[key]}`);
    url += url.indexOf('?') === -1 ? '?' : '&';
    url += p.join('&');
  }

  return url;
}

const request = (method, url, params, body, headers) => {
  let payload = { method: method };

  if (typeof headers === 'object' && headers !== null) {
    payload.headers = headers;
  }

  if (typeof body === 'object' && body !== null) {
    payload.body = JSON.stringify(body);
  }

  return fetch(addParametersToURL(url, params), payload).then((response) => {
    return response.json();
  });
}


export default class BaseClient {

  constructor(url) {
    this._baseURL = url;
  }

  get(url, params, headers) {
    return request('GET', this.url + url, params, null, headers);
  }

  post(url, params, body, headers) {
    return request('POST', this.url + url, params, body, headers);
  }

  put(url, params, headers) {
    return request('PUT', this.url + url, params, null, headers);
  }

  delete(url, params, headers) {
    return request('DELETE', this.url + url, params, null, headers);
  }

  get url() {
    return this._baseURL;
  }

}
