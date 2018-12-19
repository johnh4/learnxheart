import { call, put, take, select } from 'redux-saga/effects';
import { destroy, post, courseStudentRelationshipsSchema } from '../utils/api';
import * as actions from '../actions/courseStudentRelationships';
import { apiError } from '../actions/views';
import { constants as c } from '../constants/courseStudentRelationships';
import { currentUser } from '../selectors/sessions';

/* API helpers */
function destroyCourseStudentRelationship(csrId, token) {
  const path = `/api/course_student_relationships/${csrId}`;
  return destroy(path, token);
}

/* DESTROY A COURSE STUDENT RELATIONSHIP */
export function* destroyCourseStudentRelationshipFlow(csrId) {
  try {
    const { token } = yield select(currentUser);
    yield call(destroyCourseStudentRelationship, csrId, token);
    yield put(actions.destroyCourseStudentRelationshipSuccess(csrId));
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* watchDestroyCourseStudentRelationshipSaga() {
  while(true) {
    const { 
      courseStudentRelationshipId
    } = yield take(c.DESTROY_COURSE_STUDENT_RELATIONSHIP_REQUEST);
    yield call(
      destroyCourseStudentRelationshipFlow,
      courseStudentRelationshipId
    );
  }
}

function postCourseStudentRelationship(csr, token) {
  return post(
    '/api/course_student_relationships',
    'course_student_relationship',
    csr,
    courseStudentRelationshipsSchema,
    token
  );
}

export function* watchCreateCourseStudentRelationshipSaga() {
  while(true) {
    const {
      courseStudentRelationship: csr
    } = yield take(c.CREATE_COURSE_STUDENT_RELATIONSHIP_REQUEST);
    yield call(createCourseStudentRelationshipFlow, csr);
  }
}

export function* createCourseStudentRelationshipFlow(csr) {
  try {
    const { token } = yield select(currentUser);
    const response = yield call(postCourseStudentRelationship, csr, token);
    const entities = response.entities;
    yield put(actions.createCourseStudentRelationshipSuccess(entities));
  } catch (error) {
    yield put(apiError(error));
  }
}