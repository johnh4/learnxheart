import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

/**
 * Uses state to return courses from the store
 * @param  {object}   state
 * @return {object[]}                 All courses
 */
export const selectCourses = (state) => state.entities.courses;

/**
 * Uses state to return all courseIds from the store
 * @param  {object}   state
 * @return {number[]}                 All courseIds
 */
export const selectCourseIds = createSelector(
  selectCourses,
  (courses) => { 
    const idStrings = Object.keys(courses);
    return idStrings.map(id => parseInt(id));
  }
)

/**
 * Uses state and params to get a course from state
 * Cached by courseId
 * @param  {object} state
 * @param  {object} params
 * @param  {number} params.courseId   The course's id within params
 * @return {object}                   The course
 */
export const selectCourseByCourseIdProp = createCachedSelector(
  selectCourses,
  (_, props) => props.courseId,
  (courses, courseId) => courses[courseId]
)((_, { courseId }) => courseId);
