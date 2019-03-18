import {
  selectCourseStudentRelationships,
  selectCsrIdFromCourseAndStudentIds
} from '../courseStudentRelationships';

describe('courseStudentRelationships selectors', () => {
  describe('selectCourseStudentRelationships', () => {
    test('returns all courseStudentRelationships', () => {
      const actualResult = selectCourseStudentRelationships(state);

      const expectedResult = courseStudentRelationships;
      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('selectCourseStudentRelationshipsFromCourseAndStudentIds', () => {
    test('returns the correct csr', () => {
      const props = { courseId: 3 };
      const actualResult = selectCsrIdFromCourseAndStudentIds(state, props);

      const expectedResult = courseStudentRelationships[2].id;
      expect(actualResult).toEqual(expectedResult);
    });
  });
});

const courseStudentRelationships = {
  1: {
    id: 1,
    courseId: 2,
    studentId: 4
  },
  2: {
    id: 2,
    courseId: 3,
    studentId: 4
  }
}

const state = {
  entities: { courseStudentRelationships },
  sessions: {
    currentUser: {
      id: 4,
      type: 'Student',
      token: 'fake'
    }
  }
}