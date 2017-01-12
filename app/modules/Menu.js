export const SELECT_MENU = 'SELECT_MENU';

const defaultState = {
  index: 0,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case SELECT_MENU:
      return { ...state, index: action.index };
    default:
      return state;
  }
}

export function selectMenu(index) {
  return (dispatch) => {
    dispatch({
      type: SELECT_MENU,
      index
    });
  }
}
