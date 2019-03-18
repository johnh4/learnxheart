import courseStudentRelationshipsReducer from '../courseStudentRelationships';
import {
  createCourseStudentRelationshipSuccess,
  destroyCourseStudentRelationshipSuccess
} from '../../actions/courseStudentRelationships';

describe('courseStudentRelationships reducer', () => {
  describe ('createCourseStudentRelationshipSuccess', () => {
    it('loads the csr into the store', () => {
      // setup
      const initialState = {};
      const csr = { id: 1 };
      const courseStudentRelationships = { [csr.id]: csr };
      const entities = { courseStudentRelationships };
      const action = createCourseStudentRelationshipSuccess(entities);

      // execute
      const newState = courseStudentRelationshipsReducer(
        initialState,
        action
      );

      // verify
      const expectedState = csr;
      const actualState = newState[csr.id];
      expect(actualState).toEqual(expectedState);
    });
  });

  describe ('destroyCourseStudentRelationshipSucces', () => {
    it('removes a courseStudentRelationship from the store', () => {
      // setup
      const csr = { id: 1 };
      const otherCsr = { id: 2 };
      const courseStudentRelationships = {
        [csr.id]: csr,
        [otherCsr.id]: otherCsr
      };
      const initialState = courseStudentRelationships;
      const action = destroyCourseStudentRelationshipSuccess(csr.id);

      // execute
      const newState = courseStudentRelationshipsReducer(
        initialState,
        action
      );

      // verify
      const expectedState = { [otherCsr.id]: otherCsr };
      const actualState = newState;
      expect(actualState).toEqual(expectedState);
    });
  });
});

