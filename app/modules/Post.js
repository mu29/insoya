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
      return {
        ...state,
        posts: posts.filter((obj, pos, arr) => (arr.map(mapObj => mapObj['title']).indexOf(obj['title']) === pos)),
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
