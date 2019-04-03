import { call, put, take, select } from 'redux-saga/effects';
import { destroy, post, educatorStudentRelationshipsSchema } from '../utils/api';
import * as actions from '../actions/educatorStudentRelationships';
import { apiError } from '../actions/views';
import { constants as c } from '../constants/educatorStudentRelationships';
import { currentUser } from '../selectors/sessions';

/* API helpers */
function destroyEducatorStudentRelationship(esrId, token) {
  const path = `/api/educator_student_relationships/${esrId}`;
  return destroy(path, token);
}

/* DESTROY A EDUCATOR STUDENT RELATIONSHIP */
export function* destroyEducatorStudentRelationshipFlow(esrId) {
  try {
    const { token } = yield select(currentUser);
    yield call(destroyEducatorStudentRelationship, esrId, token);
    yield put(actions.destroyEducatorStudentRelationshipSuccess(esrId));
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* watchDestroyEducatorStudentRelationshipSaga() {
  while(true) {
    const { 
      educatorStudentRelationshipId
    } = yield take(c.DESTROY_EDUCATOR_STUDENT_RELATIONSHIP_REQUEST);
    yield call(
      destroyEducatorStudentRelationshipFlow,
      educatorStudentRelationshipId
    );
  }
}

function postEducatorStudentRelationship(esr, token) {
  return post(
    '/api/educator_student_relationships',
    'educator_student_relationship',
    esr,
    educatorStudentRelationshipsSchema,
    token
  );
}

export function* watchCreateEducatorStudentRelationshipSaga() {
  while(true) {
    const {
      educatorStudentRelationship: esr
    } = yield take(c.CREATE_EDUCATOR_STUDENT_RELATIONSHIP_REQUEST);
    yield call(createEducatorStudentRelationshipFlow, esr);
  }
}

export function* createEducatorStudentRelationshipFlow(esr) {
  try {
    const { token } = yield select(currentUser);
    const response = yield call(postEducatorStudentRelationship, esr, token);
    const entities = response.entities;
    yield put(actions.createEducatorStudentRelationshipSuccess(entities));
  } catch (error) {
    yield put(apiError(error));
  }
}
