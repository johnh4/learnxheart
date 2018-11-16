import { constants as c } from '../constants/courseStudentRelationships';

export const createCourseStudentRelationshipRequest = (courseStudentRelationship) => {
  return {
    type: c.CREATE_COURSE_STUDENT_RELATIONSHIP_REQUEST,
    courseStudentRelationship
  }
}

export const createCourseStudentRelationshipSuccess = (entities) => {
  return {
    type: c.CREATE_COURSE_STUDENT_RELATIONSHIP_SUCCESS,
    entities
  }
}

export const destroyCourseStudentRelationshipRequest = (courseStudentRelationshipId) => {
  return {
    type: c.DESTROY_COURSE_STUDENT_RELATIONSHIP_REQUEST,
    courseStudentRelationshipId
  }
}

export const destroyCourseStudentRelationshipSuccess = (courseStudentRelationshipId) => {
  return {
    type: c.DESTROY_COURSE_STUDENT_RELATIONSHIP_SUCCESS,
    courseStudentRelationshipId
  }
}