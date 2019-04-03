import {
  selectStudentIsFollowingCourse,
  selectStudentIsFollowingEducator
} from '../students';

describe('Student selectors', () => {
  describe('selectStudentIsFollowingCourse', () => {
    test('is true when the student follows the course', () => {
      const params = { courseId: 2 }
      expect(selectStudentIsFollowingCourse(state, params)).toEqual(true);
    });

    test('is false when the student does not follow the course', () => {
      const params = { courseId: 9 }
      expect(selectStudentIsFollowingCourse(state, params)).toEqual(false);
    });
  });

  describe('selectStudentIsFollowingEducator', () => {
    test('is true when the student follows the educator', () => {
      const params = { educatorId: 7 }
      expect(selectStudentIsFollowingEducator(state, params)).toEqual(true);
    });

    test('is false when the student does not follow the course', () => {
      const params = { educatorId: 9 }
      expect(selectStudentIsFollowingEducator(state, params)).toEqual(false);
    });
  });
});

const state = {
  entities: {
    courses: {
      2: {
        id: 2
      }
    },
    courseStudentRelationships: {
      1: {
        id: 1,
        courseId: 2,
        studentId: 3
      }
    },
    educatorStudentRelationships: {
      1: {
        id: 1,
        educatorId: 7,
        studentId: 3
      }
    },
    students: {
      3: {
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
  }
}
