import { all, fork } from 'redux-saga/effects';
import { watchLoadEducatorsSaga, watchLoadEducatorSaga } from './educators';
import { watchSignInSaga, watchSignOutSaga } from './sessions';

export default function* rootSaga() {
  yield all([
    fork(watchLoadEducatorSaga),
    fork(watchLoadEducatorsSaga),
    fork(watchSignInSaga),
    fork(watchSignOutSaga)
  ])
}
