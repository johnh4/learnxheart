import {
  selectCourses,
  selectCourseIds,
  selectCourseByCourseIdProp,
  selectCourseIdsByEducatorIdProp
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

  describe('selectCourseIdsByEducatorIdProp', () => {
    test('returns an educators courses', () => {
      const params = { educatorId: 1 }
      const actualResult = selectCourseIdsByEducatorIdProp(
        stateWithEducators, params
      );

      const expectedResult = [1, 2];
      expect(actualResult).toEqual(expectedResult);
    });
  });
});

const courses = {
  "1": {
    id: 1,
    educatorId: 1
  },
  "2": {
    id: 2,
    educatorId: 1
  },
  "3": {
    id: 3,
    educatorId: 2
  }
}

const educators = {
  "1": {
    id: 1
  },
  "2": {
    id: 2
  }
}
const state = {
  entities: { courses }
}

const stateWithEducators = {
  entities: {
    educators,
    courses
  }
}