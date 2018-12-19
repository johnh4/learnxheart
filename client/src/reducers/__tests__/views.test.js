import viewsReducer from '../views';
import {
  addCourseFilter,
  removeCourseFilter
} from '../../actions/views';

describe('viewsReducer', () => {
  describe('addCourseFilter', () => {
    it('addCourseFilter adds a course filter', () => {
      const filter1 = 'philosophy';
      const action = addCourseFilter(filter1);

      const actualState = viewsReducer(initialState, action);

      const expectedState = { filters: { courses: [filter1] } };
      expect(actualState).toEqual(expectedState);
    });

    it('addCourseFilter can add additional course filters', () => {
      const filter1 = 'philosophy';
      const action1 = addCourseFilter(filter1);
      const intermediateState = viewsReducer(initialState, action1);
      const filter2 = 'math';
      const action2 = addCourseFilter(filter2);

      const actualState = viewsReducer(intermediateState, action2);

      const expectedState = { filters: { courses: [filter1, filter2] } };
      expect(actualState).toEqual(expectedState);
    });

    it('addCourseFilter does not allow duplicates', () => {
      const filter1 = 'philosophy';
      const action1 = addCourseFilter(filter1);
      const intermediateState = viewsReducer(initialState, action1);
      const filter2 = 'philosophy';
      const action2 = addCourseFilter(filter2);

      const actualState = viewsReducer(intermediateState, action2);

      const expectedState = { filters: { courses: [filter1] } };
      expect(actualState).toEqual(expectedState);
    });
  });
  describe('removeCourseFilter', () => {
    it('removeCourseFilter removes a filter when it was the only one', () => {
      const initialStateWithFilters = {
        filters: {
          courses: ['engineering']
        }
      }
      const filter1 = 'engineering';
      const action = removeCourseFilter(filter1);

      const actualState = viewsReducer(initialStateWithFilters, action);

      const expectedState = { filters: { courses: [] } };
      expect(actualState).toEqual(expectedState);
    });

    it('removes a filter when it was not the only one', () => {
      const filter1 = 'engineering';
      const filter2 = 'science';
      const initialStateWithFilters = {
        filters: {
          courses: [filter1, filter2]
        }
      }
      const action = removeCourseFilter(filter2);

      const actualState = viewsReducer(initialStateWithFilters, action);

      const expectedState = { filters: { courses: [filter1] } };
      expect(actualState).toEqual(expectedState);
    });

    it('does not remove anything when filter is not present', () => {
      const initialStateWithFilters = {
        filters: {
          courses: ['engineering']
        }
      }
      const filter1 = 'math';
      const action = removeCourseFilter(filter1);

      const actualState = viewsReducer(initialStateWithFilters, action);

      const expectedState = initialStateWithFilters;
      expect(actualState).toEqual(expectedState);
    });
  });
});

const initialState = {
  filters: {
    courses: []
  }
}