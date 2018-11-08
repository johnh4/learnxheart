import { take, call, put } from 'redux-saga/effects'
import {
  SIGN_IN_REQUEST,
  SIGN_OUT_REQUEST,
} from '../constants/sessions';
import {
  signInSuccess,
  signOutSuccess
} from '../actions/sessions';
import { apiError } from '../actions/views';
import { post, signOutApiRequest, educatorSchema } from '../utils/api';
import { decamelizeKeys } from 'humps';

/***** SIGN IN *****/

// extract the user's data from the normalized api response
function extractUser(normalizedData) {
  const entities = normalizedData.entities;
  const userId = normalizedData.result;
  const type = Object.keys(entities)[0];
  const user = entities[type][userId];
  return user;
}

// api call to sign in
function signIn(email, password) {
  const path = '/api/sessions';
  const credentials = { email, password };
  const decamelizedCredentials = decamelizeKeys(credentials);
  return post(path, 'session', decamelizedCredentials, educatorSchema);
}

// manages our sign in flow
function* signInFlow(email, password) {
  try {
    const normalized = yield call(signIn, email, password);
    const user = extractUser(normalized);

    yield put(signInSuccess(user));
    // don't store user emails in local storage
    delete user.email;
    localStorage.setItem('user', JSON.stringify(user));

  } catch (error) {
    yield put(apiError(error));
  }
}

// watches for sign in request
export function* watchSignInSaga () {
  while (true) {
    // wait until we receive a sign in request
    const { email, password } = yield take(SIGN_IN_REQUEST)
    yield call(signInFlow, email, password)
  }
}

/***** SIGN OUT *****/

// api call to sign out
function signOut(currentUser) {
  const { id, token } = currentUser;
  const path = `/api/sessions/${id}`;
  const body = { id };
  return signOutApiRequest(path, body, token);
}

// manages our sign out flow
function* signOutFlow (currentUser) {
  try {
    localStorage.removeItem('user');
    yield call(signOut, currentUser);
  } catch (error) {
    yield put(apiError(error));
  } finally {
    // an api error doesn't need to prevent sign out on the client
    yield put(signOutSuccess());
  }
}

// watches for a sign out request
export function* watchSignOutSaga () {
  while (true) {
    // wait until we receive a sign out request
    const { currentUser } = yield take(SIGN_OUT_REQUEST)
    yield call(signOutFlow, currentUser)
  }
}