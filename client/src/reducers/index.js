import { combineReducers } from 'redux';
import sessions from './sessions';
import views from './views';
import educators from './educators';

const entities = combineReducers({
  educators
});

const rootReducer = combineReducers({
  entities,
  sessions,
  views
});

export default rootReducer;