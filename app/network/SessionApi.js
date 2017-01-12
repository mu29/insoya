import RestClient from '../helpers/RestClient';

export default class SessionApi {
  static login(id, password) {
    return RestClient.instance.send({
      url: '/login',
      data: {
        method: 'POST',
        body: JSON.stringify({ id, password }),
      },
    });
  }
}
