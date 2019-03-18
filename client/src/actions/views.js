import {
  ADD_COURSE_FILTER,
  REMOVE_COURSE_FILTER,
  API_ERROR
} from '../constants/views';

/**
 * Add api error messages to state
 * @param  {string}  error An api error message
 * @return {object}        The apiError action
 */
export const apiError = (error) => {
  return {
    type: API_ERROR,
    error
  }
}

/**
 * Add a course filter to state
 * @param  {string} filter   A course filter. Either course name or educator name.
 * @return {object}          The addCourseFilter action
 */
export const addCourseFilter = (filter) => {
  return {
    type: ADD_COURSE_FILTER,
    filter
  }
}

/**
 * Remove a course filter from state
 * @param  {string} filter   A course filter. Either course name or educator name.
 * @return {object}          The removeCourseFilter action
 */
export const removeCourseFilter = (filter) => {
  return {
    type: REMOVE_COURSE_FILTER,
    filter
  }
}