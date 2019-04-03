import { constants as c } from '../constants/educatorStudentRelationships';

export const createEducatorStudentRelationshipRequest = (educatorStudentRelationship) => {
  return {
    type: c.CREATE_EDUCATOR_STUDENT_RELATIONSHIP_REQUEST,
    educatorStudentRelationship
  }
}

export const createEducatorStudentRelationshipSuccess = (entities) => {
  return {
    type: c.CREATE_EDUCATOR_STUDENT_RELATIONSHIP_SUCCESS,
    entities
  }
}

export const destroyEducatorStudentRelationshipRequest = (educatorStudentRelationshipId) => {
  return {
    type: c.DESTROY_EDUCATOR_STUDENT_RELATIONSHIP_REQUEST,
    educatorStudentRelationshipId
  }
}

export const destroyEducatorStudentRelationshipSuccess = (educatorStudentRelationshipId) => {
  return {
    type: c.DESTROY_EDUCATOR_STUDENT_RELATIONSHIP_SUCCESS,
    educatorStudentRelationshipId
  }
}
