import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from '../constants/sessions';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('user'))
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.user,
      }
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null
      }
    default:
      return state;
  }
}