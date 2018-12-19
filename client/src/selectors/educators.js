import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { selectCourseByCourseIdProp } from './courses';

/**
 * Uses state to return educators from the store
 * @param  {object}   state
 * @return {object[]}                   All educators
 */
export const selectEducators = (state) => state.entities.educators;

/**
 * Uses state and params to return the a course's educator
 * @param  {object} state
 * @param  {object} params
 * @param  {number} params.courseId   The course's id within params
 * @return {object|null|false}        The course's educator
 */
export const selectEducatorByCourseIdProp = createSelector(
  selectCourseByCourseIdProp,
  selectEducators,
 (course, educators) => !!course && educators[course.educator]
)

/**
 * Uses state and params to return the educator's first and last name
 * Cached by courseId
 * @param  {object} state
 * @param  {object} params
 * @param  {number} params.courseId   The course's id within params
 * @return {string|null}              The educator's first and last name
 */
export const selectEducatorNameByCourseIdProp = createCachedSelector(
  selectEducatorByCourseIdProp,
  (educator) => !!educator
                  ? `${educator.firstName} ${educator.lastName}`
                  : null
)((_, props) => props.courseId);

/**
 * Uses state and params to get an educator from state
 * Cached by educatorId
 * @param  {object} state
 * @param  {object} params
 * @param  {number} params.educatorId   The educator's id within params
 * @return {object}                     The educator
 */
export const selectEducatorByEducatorIdProp = createCachedSelector(
  selectEducators,
  (_, props) => props.educatorId,
  (educators, educatorId) => educators[educatorId]
)((_, { educatorId }) => educatorId);
