import { API_ENTRY } from '../config';

let instance = null;

export default class RestClient {
  static get instance() {
    if(!instance) {
      instance = new RestClient();
    }
    return instance;
  }

  constructor() {
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': 'JyY5197EJK6hf1qKjnUk65CkAQv6gsBM6Migvizr',
    };
    this.checkStatus = this.checkStatus.bind(this);
    this.parseJSON = this.parseJSON.bind(this);
  }

  setHeaders(value) {
    this.headers = value;
  }

  send({ url, data, success, error }) {
    if (data.queryParams) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + this.queryParams(data.queryParams);
      delete data.queryParams;
    }

    const params = Object.assign({}, data, { headers: this.headers });
    return fetch(`${API_ENTRY}${url}`, params)
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  parseJSON(response) {
    return response.json()
  }

  queryParams(params) {
    return Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  }
}