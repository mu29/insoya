export const SHOW_PROGRESS = 'SHOW_PROGRESS';
export const HIDE_PROGRESS = 'HIDE_PROGRESS';

const defaultState = {
  showing: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case SHOW_PROGRESS:
      return { ...state, showing: true };
    case HIDE_PROGRESS:
      return { ...state, showing: false };
    default:
      return state;
  }
}

export function showProgress() {
  return (dispatch) => {
    dispatch({ type: SHOW_PROGRESS });
  };
}

export function hideProgress() {
  return (dispatch) => {
    dispatch({ type: HIDE_PROGRESS });
  };
}
