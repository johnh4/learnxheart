import { createSelector } from 'reselect';
import { selectCoursesCurrentStudentIsFollowing } from './students';
import { selectCourses } from './courses';
import Fuse from 'fuse.js';
import { selectEducators } from './educators';
import { deepCloneArrayOfObjects } from '../utils/appHelpers';

/**
 * Get filters from state
 * @param  {object}   state
 * @return {object}          Fitlers state object
 */
export const selectFilters = (state) => state.views.filters;

/**
 * Get course filters from state
 * @param  {object}   state
 * @return {string[]}          An array of course filters
 */
 export const selectCourseFilters = createSelector(
   selectFilters,
   (filters) => filters.courses
 );

/**
 * Filter the courses by course filters, and return their ids
 * @param  {object}   state
 * @return {number[]}          A filtered array of course ids
 */
 export const selectFilteredCourses = createSelector(
   selectCourses,
   selectEducators,
   selectCourseFilters,
   (courses, educators, filters) => {
     return filterCourses(courses, educators, filters);
   }
 );

/**
 * Filter the course that the current student is following by course filters,
 * and return their ids
 * @param  {object}   state
 * @return {number[]}          A filtered array of course ids
 */
 export const selectFilteredCoursesCurrentStudentIsFollowing = createSelector(
   selectCoursesCurrentStudentIsFollowing,
   selectCourses,
   selectEducators,
   selectCourseFilters,
   (followedCourseIds, allCourses, educators, filters) => {
     const followedCourses = followedCourseIds.map(
       courseId => allCourses[courseId]
     );
     return filterCourses(followedCourses, educators, filters);
   }
 );

/**
 * Filter courses by name, description, educator first name,
 * and educator last name
 * @param  {object}   courses     The object courses that we're filtering
 * @param  {object}   educators   All educators
 * @param  {string[]} filters     The filters that we're applying
 * @return {number[]}             An array of filtered course ids
 */
const filterCourses = (courses, educators, filters) => {
  let coursesArray = deepCloneArrayOfObjects(Object.values(courses));
  // coursesArray = Object.values(courses).slice(0);
  coursesArray.map(course => (
    course.educator = educators[course.educator]
  ));
  filters.forEach(filter => {
    const options = {
      keys: [
        'name',
        'description',
        'educator.firstName',
        'educator.lastName'
      ],
      threshold: 0.425
    };
    const fuse = new Fuse(coursesArray, options);
    coursesArray = fuse.search(filter);
  });
  return coursesArray.map(course => parseInt(course.id));
}