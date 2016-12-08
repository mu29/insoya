'use strict';

import { API_ENTRY } from '../config';
import RestClient from '../helpers/RestClient';

export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';

const defaultState = {
  token: '',
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOGIN_SUCCEEDED:
      return { ...state, token: action.token };
    default:
      return state;
  }
}

function loginSuccess(user) {
  RestClient.instance.setHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Token token=${user.authentication_token}`
  });
  return {
    type: LOGIN_SUCCEEDED,
    token: user.authentication_token,
  };
}

function loginFail() {
  return (dispatch) => {
    // dispatch(hideProgress());
    // dispatch(showErrorAlert({ message: '로그인에 실패하였습니다.' }));
  };
}

export function login(id, password) {
  return (dispatch, getState) => {
    RestClient.instance.send({
      url: `${API_ENTRY}/sessions`,
      data: {
        method: 'POST',
        body: JSON.stringify({ session: {
          login: id,
          password,
        }})
      },
      success(res) {
        console.log(res);
        dispatch(loginSuccess(res.data.user));
      },
      error() {
        dispatch(loginFail());
      }
    });
  };
}
