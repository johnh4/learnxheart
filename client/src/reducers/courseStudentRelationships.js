import merge from 'lodash/merge';
import {
  DESTROY_COURSE_STUDENT_RELATIONSHIP_SUCCESS
} from '../constants/courseStudentRelationships';

const INITIAL_STATE = {};

const courseStudentRelationships = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DESTROY_COURSE_STUDENT_RELATIONSHIP_SUCCESS:
      return removeEntity(state, action.courseStudentRelationshipId);
    default:
      if (action.entities && action.entities.courseStudentRelationships) {
        return merge({}, state, action.entities.courseStudentRelationships);
      }
      return state;
  }
}

export default courseStudentRelationships;

const removeEntity = (state, entityId) => {
  const {
    [entityId.toString()]: _,
    ...newState
  } = state;
  return newState;
}