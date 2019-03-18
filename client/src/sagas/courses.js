import { call, put, take, takeEvery } from 'redux-saga/effects';
import { get } from '../utils/api';
import * as actions from '../actions/courses';
import { apiError } from '../actions/views';
import { constants as c } from '../constants/courses';

import { courseSchema } from '../utils/api';

/* API helpers */
function getCourse(courseId) {
  return get(`/api/courses/${courseId}`, courseSchema);
}

function getCourses() {
  return get('/api/courses', [courseSchema]);
}

export const coursesApi = {
  getCourse,
  getCourses
}

/* LOAD A COURSE */
export function* loadCourseFlow(courseId) {
  try {
    const response = yield call(getCourse, courseId);
    const entities = response.entities;
    const course = entities.courses;
    yield put(actions.loadCoursesSuccess(course));
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* watchLoadCourseSaga() {
  while(true) {
    const { courseId } = yield take(c.LOAD_COURSE_REQUEST);
    yield call(loadCourseFlow, courseId);
  }
}

/* LOAD COURSES */
export function* loadCoursesFlow() {
  try {
    const response = yield call(getCourses);
    // entities will contain both courses and courseStudentRelationships
    const entities = response.entities;
    yield put(actions.loadCoursesSuccess(entities));
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* watchLoadCoursesSaga() {
  yield takeEvery(c.LOAD_COURSES_REQUEST, loadCoursesFlow);
}
