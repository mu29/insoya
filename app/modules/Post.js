import PostApi from '../network/PostApi';
import { hideProgress } from './Progress';

export const POST_LIST_SUCCEEDED = 'POST_LIST_SUCCEEDED';
export const POST_SUCCEEDED = 'POST_SUCCEEDED';
export const ADD_COMMENT = 'ADD_COMMENT';

const defaultState = {
  posts: [],
  post: {},
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case POST_LIST_SUCCEEDED:
      let posts = [...state.posts];
      const postIndexs = posts.map(p => p.index);
      action.posts.forEach(post => {
        post.menu = action.menu;
        const index = postIndexs.indexOf(post.index);
        if (index > -1) {
          posts[index] = post;
        } else {
          posts.push(post);
        }
      });
      posts.sort((prev, next) => Number(next.index) - Number(prev.index));
      return { ...state, posts };
    case POST_SUCCEEDED:
      return { ...state, post: action.post };
    case ADD_COMMENT:
      return {
        ...state, post: {
          ...state.post,
          commentList: [
            ...state.post.commentList,
            { author: '나', date: '방금 전 작성함', content: `${action.content}\n` }
          ]
        }
      };
    default:
      return state;
  }
}

function fetchPostListSuccess(posts, menu) {
  return (dispatch) => {
    dispatch(hideProgress());
    dispatch({
      type: POST_LIST_SUCCEEDED,
      menu,
      posts,
    });
  }
}

function fetchPostListFail() {
  return (dispatch) => {
    dispatch(hideProgress());
  }
}

export function fetchPostList(url, menu) {
  return (dispatch) => {
    PostApi.fetchPostList(url)
      .then((res) => {
        dispatch(fetchPostListSuccess(res, menu));
      })
      .catch(() => dispatch(fetchPostListFail()));
  };
}

function readPostSuccess(post) {
  return (dispatch) => {
    dispatch(hideProgress());
    dispatch({
      type: POST_SUCCEEDED,
      post,
    });
  }
}

function readPostFail() {
  return (dispatch) => {
    dispatch(hideProgress());
  }
}

export function readPost(url) {
  return (dispatch) => {
    PostApi.readPost(url)
      .then((res) => {
        dispatch(readPostSuccess(res));
      })
      .catch(() => dispatch(readPostFail()));
  };
}

export function addComment(content) {
  return (dispatch) => {
    dispatch({
      type: ADD_COMMENT,
      content,
    });
  }
}
