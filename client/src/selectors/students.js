import { createSelector } from 'reselect';
import some from 'lodash/some';
import filter from 'lodash/filter';
import difference from 'lodash/difference';
import { currentStudent } from './sessions';
import { selectCourses } from './courses';
import { selectCourseStudentRelationships } from './courseStudentRelationships';
import { selectEducatorStudentRelationships } from './educatorStudentRelationships';

/**
 * Uses state to return the ids of the courses that the current student IS following
 * @param  {object}   state
 * @return {number[]}          The course ids that the student IS following
 */
export const selectCoursesCurrentStudentIsFollowing = createSelector(
  selectCourseStudentRelationships,
  currentStudent,
  (courseStudentRelationships, student) => {
    if (student) {
      const cSrelationships = filter(courseStudentRelationships, { studentId: student.id });
      const followedCourseIds = Object.values(cSrelationships).map(rel => rel.courseId);
      return followedCourseIds;
    } else {
      return [];
    }
  }
);

/**
 * Uses state to return the ids of the courses that the current student is NOT following
 * @param  {object}   state
 * @return {number[]}          The course ids that the student is NOT following
 */
export const selectCoursesCurrentStudentIsNotFollowing = createSelector(
  selectCourses,
  selectCoursesCurrentStudentIsFollowing,
  (allCourses, followedCourseIds) => {
    const courseIds = Object.keys(allCourses);
    const allCoursesNumbers = courseIds.map(num => Number.parseInt(num));
    const courseIdsNotFollowed = difference(allCoursesNumbers, followedCourseIds);
    return courseIdsNotFollowed;
  }
);

/**
 * Uses state and params to determine if the student is following a course
 * @param  {object} state
 * @param  {object} params
 * @param  {number} params.courseId   The course's id within params
 * @return {boolean}                  Whether or not the student follows the course
 */
export const selectStudentIsFollowingCourse = createSelector(
  selectCourseStudentRelationships,
  currentStudent,
  (_, { courseId }) => Number(courseId),
  (courseStudentRelationships, student, courseId) => {
    if (student) {
      return some(
        courseStudentRelationships,
        { 'studentId': student.id, 'courseId': courseId }
      )
    } else {
      return false;
    }
  }
);

/**
 * Uses state and params to determine if the student is following an educator
 * @param  {object} state
 * @param  {object} params
 * @param  {number} params.educatorId   The educator's id within params
 * @return {boolean}                    Whether or not the student follows the educator
 */
export const selectStudentIsFollowingEducator = createSelector(
  selectEducatorStudentRelationships,
  currentStudent,
  (_, { educatorId }) => Number(educatorId),
  (educatorStudentRelationships, student, educatorId) => {
    if (student) {
      return some(
        educatorStudentRelationships,
        { 'studentId': student.id, 'educatorId': educatorId }
      )
    } else {
      return false;
    }
  }
);