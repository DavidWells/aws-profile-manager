import * as ActionTypes from '../constants/ActionTypes';

let defaultState = {
};

export default function(state = defaultState, action) {
  switch (action.type) {
    //case ActionTypes.TITLE_CHANGED:
    //  return {...state, title: action.text};
    default:
      return state;
  }
}
