import {
  selectFilters,
  selectCourseFilters,
  selectFilteredCourses,
  selectFilteredCoursesCurrentStudentIsFollowing
} from '../views';

describe('View selectors', () => {
  describe('selectFilters', () => {
    test('returns filters state', () => {
      const actualResult = selectFilters(getState());

      const expectedResult = { courses: courseFilters };
      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('selectCourseFilters', () => {
    test('returns course filters', () => {
      const actualResult = selectCourseFilters(getState());

      const expectedResult = courseFilters;
      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('selectFilteredCourses', () => {
    test('returns filtered courses by description and ed name', () => {
      const actualResult = selectFilteredCourses(getState());

      const expectedResult = [2];
      expect(actualResult).toEqual(expectedResult);
    });

    test('returns filtered courses by educator name', () => {
      const state = getState(['chelsea'])
      const actualResult = selectFilteredCourses(state);

      const expectedResult = [2, 7];
      expect(actualResult).toEqual(expectedResult);
    });

    test('returns filtered courses by educator name in the same filter', () => {
      const state = getState(['chelea philosophy'])
      const actualResult = selectFilteredCourses(state);

      const expectedResult = [2];
      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('selectFilteredCoursesCurrentStudentIsFollowing', () => {
    test('returns filtered courses that the student is following', () => {
      const state = getState(['philosophy']);
      const actualResult = selectFilteredCoursesCurrentStudentIsFollowing(state);

      const expectedResult = [2];
      expect(actualResult).toEqual(expectedResult);
    });
  });
});

const courseFilters = ['philosophy', 'chelsea'];

const getState = (filters = courseFilters) => ({
  entities: {
    courses: {
      '2': {
        id: 2,
        educator: 7,
        name: 'Philosophy 101'
      },
      '4': {
        id: 4,
        educator: 8,
        name: 'Engineering 101'
      },
      '7': {
        id: 7,
        educator: 7,
        name: 'Health'
      }
    },
    courseStudentRelationships: {
      '1': {
        id: 1,
        courseId: 2,
        studentId: 3
      },
      '2': {
        id: 2,
        courseId: 7,
        studentId: 3
      }
    },
    educators: {
      '7': {
        id: 7,
        firstName: 'Chelsea'
      },
      '8': {
        id: 8,
        lastName: 'Cremin'
      }
    },
    students: {
      '3': {
        id: 3
      }
    }
  },
  sessions: {
    currentUser: {
      id: 3,
      token: 'fake',
      type: 'Student'
    }
  },
  views: {
    filters: {
      courses: filters
    }
  }
});

// const courseStudentRelationships = {
//   1: {
//     id: 1,
//     courseId: 2,
//     studentId: 3
//   },
//   2: {
//     id: 2,
//     courseId: 3,
//     studentId: 3
//   }
// }

// const state = {
//   entities: { courseStudentRelationships }
// }