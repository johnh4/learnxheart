import {
  selectEducatorStudentRelationships,
  selectEsrIdFromEducatorAndStudentIds
} from '../educatorStudentRelationships';

describe('educatorStudentRelationships selectors', () => {
  describe('selectEducatorStudentRelationships', () => {
    test('returns all educatorStudentRelationships', () => {
      const actualResult = selectEducatorStudentRelationships(state);

      const expectedResult = educatorStudentRelationships;
      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('selectEducatorStudentRelationshipsFromEducatorAndStudentIds', () => {
    test('returns the correct csr', () => {
      const props = { educatorId: 3 };
      const actualResult = selectEsrIdFromEducatorAndStudentIds(state, props);

      const expectedResult = educatorStudentRelationships[2].id;
      expect(actualResult).toEqual(expectedResult);
    });
  });
});

const educatorStudentRelationships = {
  1: {
    id: 1,
    educatorId: 2,
    studentId: 4
  },
  2: {
    id: 2,
    educatorId: 3,
    studentId: 4
  }
}

const state = {
  entities: { educatorStudentRelationships },
  sessions: {
    currentUser: {
      id: 4,
      type: 'Student',
      token: 'fake'
    }
  }
}
