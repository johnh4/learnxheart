import merge from 'lodash/merge';

const INITIAL_COURSES = {};

const courses = (state = INITIAL_COURSES, action) => {
  switch (action.type) {
    default:
      if (action.entities && action.entities.courses) {
        return merge({}, state, action.entities.courses);
      }
      return state;
  }
}

export default courses;
