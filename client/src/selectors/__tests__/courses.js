import {
  selectCourses,
  selectCourseIds,
  selectCourseByCourseIdProp
} from '../courses';

describe('courses selectors', () => {
  describe('selectCourses', () => {
    test('returns all courses', () => {
      const actualResult = selectCourses(state);

      const expectedResult = courses;
      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('selectCourseIds', () => {
    test('returns all courses', () => {
      const actualResult = selectCourseIds(state);

      const expectedResult = [1, 2, 3];
      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('selectCourseByCourseIdProp', () => {
    test('returns all courses', () => {
      const params = { courseId: 2 }
      const actualResult = selectCourseByCourseIdProp(state, params);

      const expectedResult = courses[2];
      expect(actualResult).toEqual(expectedResult);
    });
  });
});

const courses = {
  "1": {
    id: 1
  },
  "2": {
    id: 2
  },
  "3": {
    id: 3
  }
}

const state = {
  entities: { courses }
}
