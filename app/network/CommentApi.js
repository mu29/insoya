import RestClient from '../helpers/RestClient';

export default class CommentApi {
  static createComment(id, password, referer, content) {
    return RestClient.instance.send({
      url: '/comment',
      data: {
        method: 'POST',
        body: JSON.stringify({ id, password, referer, content }),
      },
    });
  }
}
