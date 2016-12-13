import PostApi from '../network/PostApi';
import { hideProgress } from './Progress';

export const POST_LIST_SUCCEEDED = 'POST_LIST_SUCCEEDED';
export const POST_SUCCEEDED = 'POST_SUCCEEDED';

const defaultState = {
  posts: [],
  post: {},
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case POST_LIST_SUCCEEDED:
      let posts = [ ...state.posts, ...action.posts.map(p => ({ ...p, menu: action.menu })) ];
      posts = posts.filter((obj, pos, arr) => (arr.map(mapObj => mapObj.index).indexOf(obj.index) === pos))
                  .sort((prev, next) => Number(next.index) - Number(prev.index));
      return {
        ...state,
        posts,
      };
    case POST_SUCCEEDED:
      return { ...state, post: action.post };
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
