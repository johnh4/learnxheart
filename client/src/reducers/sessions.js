import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from '../constants/sessions';
import { createSelector } from 'reselect';

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

export const currentUser = (state) => state.sessions.currentUser;
export const token = createSelector(currentUser, (user) => !!user ? user.token : null);
export const currentUserName = createSelector(
  currentUser,
  (user) => !!user ? `${user.firstName} ${user.lastName}` : null
);
export const userSignedIn = createSelector(
  currentUser,
  token,
  (user, authToken) => !!user && !!authToken
);
export const educatorSignedIn = createSelector(
  currentUser,
  userSignedIn,
  (user, signedIn) => !!user && (user.type === "Educator") && !!signedIn
);
export const studentSignedIn = createSelector(
  currentUser,
  userSignedIn,
  (user, signedIn) => !!user && (user.type === "Student") && !!signedIn
);