import RestClient from 'helpers/RestClient';

export default class PostApi {
  static fetchPostList(url) {
    return RestClient.instance.send({
      url: '/list',
      data: {
        method: 'POST',
        body: JSON.stringify({ url }),
      },
    });
  }

  static readPost(url) {
    return RestClient.instance.send({
      url: '/content',
      data: {
        method: 'POST',
        body: JSON.stringify({ url }),
      },
    });
  }
}
