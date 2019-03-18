import { all, fork } from 'redux-saga/effects';
import { watchSignInSaga, watchSignOutSaga } from './sessions';
import { watchLoadEducatorsSaga, watchLoadEducatorSaga } from './educators';
import { watchLoadCoursesSaga, watchLoadCourseSaga } from './courses';
import {
  watchCreateCourseStudentRelationshipSaga,
  watchDestroyCourseStudentRelationshipSaga
} from './courseStudentRelationships';

export default function* rootSaga() {
  yield all([
    fork(watchLoadEducatorSaga),
    fork(watchLoadEducatorsSaga),
    fork(watchLoadCourseSaga),
    fork(watchLoadCoursesSaga),
    fork(watchSignInSaga),
    fork(watchSignOutSaga),
    fork(watchCreateCourseStudentRelationshipSaga),
    fork(watchDestroyCourseStudentRelationshipSaga)
  ])
}
