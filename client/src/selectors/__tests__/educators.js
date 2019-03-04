import {
  selectEducators,
  selectEducatorByCourseIdProp,
  selectEducatorNameByCourseIdProp,
  selectEducatorByEducatorIdProp
} from '../educators';

describe('Educator selectors', () => {
  describe('selectEducators', () => {
    test('returns all educators', () => {
      const actualResult = selectEducators(state);

      const expectedResult = educators;
      expect(actualResult).toEqual(expectedResult);
    });

  });
  describe('selectEducatorByCourseIdProp', () => {
    test('returns the correct educator', () => {
      const params = { courseId: 2 }

      const actualResult = selectEducatorByCourseIdProp(state, params);

      const expectedResult = educator;
      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('selectEducatorNameByCourseIdProp', () => {
    test('returns the correct educator', () => {
      const params = { courseId: 2 }

      const actualResult = selectEducatorNameByCourseIdProp(state, params);

      const expectedResult = 'Jon Stark';
      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('selectEducatorByEducatorIdProp', () => {
    test('returns all educators', () => {
      const params = { educatorId: educator.id }
      const actualResult = selectEducatorByEducatorIdProp(state, params);

      const expectedResult = educators[educator.id];
      expect(actualResult).toEqual(expectedResult);
    });
  });
});

const educator = { id: 3, firstName: 'Jon', lastName: 'Stark' }
const educators = {
  [educator.id]: educator,
  4: { id: 4, firstName: 'Bran', lastName: 'Stark' }
};
const state = {
  entities: {
    courses: {
      2: {
        id: 2,
        educatorId: 3
      }
    },
    educators
  }
}

