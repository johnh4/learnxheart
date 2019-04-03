import { createSelector } from 'reselect';
import find from 'lodash/find';
import { currentStudent } from './sessions';

/**
 * Uses state to return educatorStudentRelationships from the store
 * @param  {object}   state
 * @return {object[]}                   All educatorStudentRelationships
 */
export const selectEducatorStudentRelationships = (state) => {
  return state.entities.educatorStudentRelationships;
}

/**
 * Uses state to find an ESR from a student id and educator id
 * @param  {object}   state
 * @param  {object}   props
 * @return {number}                   The educator student relationship id
 */
export const selectEsrIdFromEducatorAndStudentIds = createSelector(
  selectEducatorStudentRelationships,
  currentStudent,
  (_, props) => props.educatorId,
  (esrs, student, educatorId) => {
    const esr = find(
      esrs,
      esr => !!esr && esr.educatorId === Number(educatorId) && esr.studentId === student.id
    );
    if(!!esr) {
      return esr.id;
    } else {
      return null;
    }
  }
)
