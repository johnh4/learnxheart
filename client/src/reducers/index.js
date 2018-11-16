import { combineReducers } from 'redux';
import sessions from './sessions';
import views from './views';
import educators from './educators';
import courses from './courses';
import courseStudentRelationships from './courseStudentRelationships';

const entities = combineReducers({
  courses,
  courseStudentRelationships,
  educators
});

const rootReducer = combineReducers({
  entities,
  sessions,
  views
});

export default rootReducer;