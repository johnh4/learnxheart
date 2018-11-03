import { all, fork } from 'redux-saga/effects';
import { watchLoadEducatorsSaga, watchLoadEducatorSaga } from './educators';

export default function* rootSaga() {
  yield all([
    fork(watchLoadEducatorSaga),
    fork(watchLoadEducatorsSaga)
  ])
}
