import SessionApi from '../network/SessionApi';
import { hideProgress } from './Progress';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const CLOSE_LOGIN_ALERT = 'CLOSE_LOGIN_ALERT';

const defaultState = {
  id: '',
  password: '',
  message: '',
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, id: action.id, password: action.password, message: '로그인에 성공하였습니다.' };
    case LOGIN_FAIL:
      return { ...state, id: '', password: '', message: '아이디와 비밀번호를 확인해주세요.' };
    case CLOSE_LOGIN_ALERT:
      return { ...state, message: '' };
    default:
      return state;
  }
}

function loginSuccess(id, password) {
  return (dispatch) => {
    dispatch(hideProgress());
    dispatch({
      type: LOGIN_SUCCESS,
      id,
      password,
    });
  }
}

function loginFail() {
  return (dispatch) => {
    dispatch(hideProgress());
    dispatch({
      type: LOGIN_FAIL,
    });
  }
}

export function login(id, password) {
  return (dispatch) => {
    SessionApi.login(id, password)
      .then(() => dispatch(loginSuccess(id, password)))
      .catch(() => dispatch(loginFail()));
  };
}
