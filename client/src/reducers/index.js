import { combineReducers } from 'redux';
import sessions from './sessions';
import views from './views';
import educators from './educators';
import courses from './courses';
import courseStudentRelationships from './courseStudentRelationships';
import educatorStudentRelationships from './educatorStudentRelationships';

const entities = combineReducers({
  courses,
  courseStudentRelationships,
  educatorStudentRelationships,
  educators
});

const rootReducer = combineReducers({
  entities,
  sessions,
  views
});

export default rootReducer;