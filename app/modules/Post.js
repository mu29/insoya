import PostApi from 'network/PostApi';

export const POST_LIST_SUCCEEDED = 'POST_LIST_SUCCEEDED';
export const POST_SUCCEEDED = 'POST_SUCCEEDED';

const defaultState = {
  posts: [],
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case POST_LIST_SUCCEEDED:
      return { ...state, posts: action.posts };
    case POST_SUCCEEDED:
      return { ...state, posts: { ...state.posts, action.post } };
    default:
      return state;
  }
}

function fetchPostListSuccess(posts) {
  return {
    type: POST_LIST_SUCCEEDED,
    posts,
  };
}

function fetchPostListFail() {
  return {
  }
}

export function fetchPostList(url) {
  return (dispatch) => {
    PostApi.fetchPostList(url)
      .then((res) => {
        dispatch(fetchPostListSuccess(res))
      })
      .catch(() => dispatch(fetchPostListFail()));
  };
}
