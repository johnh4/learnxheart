import { constants as c } from '../constants/courses';

export const loadCourseRequest = (courseId) => {
  return {
    type: c.LOAD_COURSE_REQUEST,
    courseId
  }
}

export const loadCoursesRequest = () => {
  return {
    type: c.LOAD_COURSES_REQUEST
  }
}

export const loadCoursesSuccess = (entities) => {
  return {
    type: c.LOAD_COURSES_SUCCESS,
    entities
  }
}
