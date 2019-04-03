import merge from 'lodash/merge';
import {
  DESTROY_EDUCATOR_STUDENT_RELATIONSHIP_SUCCESS
} from '../constants/educatorStudentRelationships';

const INITIAL_STATE = {};

const educatorStudentRelationships = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DESTROY_EDUCATOR_STUDENT_RELATIONSHIP_SUCCESS:
      return removeEntity(state, action.educatorStudentRelationshipId);
    default:
      if (action.entities && action.entities.educatorStudentRelationships) {
        return merge({}, state, action.entities.educatorStudentRelationships);
      }
      return state;
  }
}

export default educatorStudentRelationships;

const removeEntity = (state, entityId) => {
  const {
    [entityId.toString()]: _,
    ...newState
  } = state;
  return newState;
}
