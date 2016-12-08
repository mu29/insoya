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
    };
    this.checkStatus = this.checkStatus.bind(this);
    this.parseJSON = this.parseJSON.bind(this);
  }

  setHeaders(value) {
    this.headers = value;
  }

  send({ url, data, success, error }) {
    const params = Object.assign({}, data, { headers: this.headers });
    fetch(url, params)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then((res) => { success(res) })
      .catch((err) => { error(err) });
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
}
