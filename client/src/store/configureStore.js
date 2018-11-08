import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import createMiddlewareSaga from 'redux-saga';
import rootSaga from '../sagas';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createMiddlewareSaga();

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware)
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}