import { call, put, take, takeEvery } from 'redux-saga/effects';
import { get } from '../utils/api';
import * as actions from '../actions/educators';
import { apiError } from '../actions/views';
import c from '../constants/educators';

import { educatorSchema } from '../utils/api';

/* API helpers */
function getEducator(educatorId) {
  return get(`/api/educators/${educatorId}`, educatorSchema);
}

function getEducators() {
  return get('/api/educators', [educatorSchema]);
}

export const educatorsApi = {
  getEducator,
  getEducators
}

/* LOAD AN EDUCATOR */
export function* loadEducatorFlow(educatorId) {
  try {
    const response = yield call(getEducator, educatorId);
    const entities = response.entities;
    yield put(actions.loadEducatorsSuccess(entities));
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* watchLoadEducatorSaga() {
  while(true) {
    const { educatorId } = yield take(c.LOAD_EDUCATOR_REQUEST);
    yield call(loadEducatorFlow, educatorId);
  }
}

/* LOAD EDUCATORS */
export function* loadEducatorsFlow() {
  try {
    const response = yield call(getEducators);
    const entities = response.entities;
    yield put(actions.loadEducatorsSuccess(entities));
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* watchLoadEducatorsSaga() {
  yield takeEvery(c.LOAD_EDUCATORS_REQUEST, loadEducatorsFlow);
}