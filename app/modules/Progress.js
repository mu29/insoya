export const SHOW_PROGRESS = 'SHOW_PROGRESS';
export const SHOW_BACKGROUND_PROGRESS = 'SHOW_BACKGROUND_PROGRESS';
export const HIDE_PROGRESS = 'HIDE_PROGRESS';

const defaultState = {
  showing: false,
  backgroundShowing: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case SHOW_PROGRESS:
      return { ...state, showing: true };
    case SHOW_BACKGROUND_PROGRESS:
      return { ...state, backgroundShowing: true };
    case HIDE_PROGRESS:
      return { ...state, showing: false, backgroundShowing: false };
    default:
      return state;
  }
}

export function showProgress() {
  return {
    type: SHOW_PROGRESS,
  };
}

export function showBackgroundProgress() {
  return {
    type: SHOW_BACKGROUND_PROGRESS,
  };
}

export function hideProgress() {
  return {
    type: HIDE_PROGRESS,
  };
}
