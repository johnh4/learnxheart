import { createSelector } from 'reselect';
import find from 'lodash/find';
import { currentStudent } from './sessions';

/**
 * Uses state to return courseStudentRelationships from the store
 * @param  {object}   state
 * @return {object[]}                   All courseStudentRelationships
 */
export const selectCourseStudentRelationships = (state) => {
  return state.entities.courseStudentRelationships;
}

/**
 * Uses state to find a CSR from a student id and course id
 * @param  {object}   state
 * @param  {object}   props
 * @return {number}                   The course student relationship id
 */
export const selectCsrIdFromCourseAndStudentIds = createSelector(
  selectCourseStudentRelationships,
  currentStudent,
  (_, props) => props.courseId,
  (csrs, student, courseId) => {
    const csr = find(
      csrs,
      csr => !!csr && csr.courseId === Number(courseId) && csr.studentId === student.id
    );
    if(!!csr) {
      return csr.id;
    } else {
      return null;
    }
  }
)