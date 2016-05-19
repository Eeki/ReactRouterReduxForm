import {HOME_FORM_TO_PAGE} from '../actions/const';

export default function (state = 0, action) {
  switch(action.type) {
    case HOME_FORM_TO_PAGE:
      return { ...state, pageIndex: action.payload}
  }
  return state
}