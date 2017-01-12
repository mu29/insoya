import CommentApi from '../network/CommentApi';
import { addComment } from './Post';

export const COMMENT_SUCCESS = 'COMMENT_SUCCESS';
export const COMMENT_FAIL = 'COMMENT_FAIL';
export const SHOW_COMMENT_PROGRESS = 'SHOW_COMMENT_PROGRESS';
export const HIDE_COMMENT_PROGRESS = 'HIDE_COMMENT_PROGRESS';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

const defaultState = {
  message: '',
  progress: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case COMMENT_SUCCESS:
      return { ...state, message: '정상적으로 작성되었습니다.' };
    case COMMENT_FAIL:
      return { ...state, message: '댓글 작성에 실패했습니다.\n로그인 정보를 확인해주세요.' };
    case SHOW_COMMENT_PROGRESS:
      return { ...state, progress: true };
    case HIDE_COMMENT_PROGRESS:
      return { ...state, progress: false };
    case CLEAR_MESSAGE:
      return { ...state, message: '' };
    default:
      return state;
  }
}

function commentSuccess(content) {
  return (dispatch) => {
    dispatch(addComment(content))
    dispatch(hideCommentProgress());
    dispatch({
      type: COMMENT_SUCCESS,
    });
  }
}

function commentFail() {
  return (dispatch) => {
    dispatch(hideCommentProgress());
    dispatch({
      type: COMMENT_FAIL,
    });
  }
}

export function createComment(id, password, referer, content) {
  return (dispatch) => {
    dispatch(showCommentProgress());
    CommentApi.createComment(id, password, referer, content)
      .then((res) => {
        dispatch(commentSuccess(content));
      })
      .catch(() => dispatch(commentFail()));
  };
}

export function showCommentProgress() {
  return {
    type: SHOW_COMMENT_PROGRESS,
  };
}

export function hideCommentProgress() {
  return {
    type: HIDE_COMMENT_PROGRESS,
  };
}

export function clearMessage() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGE,
    });
  };
}
