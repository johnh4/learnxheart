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
 * @return {object|null}              The course's educator
 */
export const selectEducatorByCourseIdProp = createSelector(
  selectCourseByCourseIdProp,
  selectEducators,
 (course, educators) => educators[course.educator]
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
