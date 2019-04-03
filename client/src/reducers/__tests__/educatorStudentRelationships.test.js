import educatorStudentRelationshipsReducer from '../educatorStudentRelationships';
import {
  createEducatorStudentRelationshipSuccess,
  destroyEducatorStudentRelationshipSuccess
} from '../../actions/educatorStudentRelationships';

describe('educatorStudentRelationships reducer', () => {
  describe ('createEducatorStudentRelationshipSuccess', () => {
    it('loads the esr into the store', () => {
      // setup
      const initialState = {};
      const esr = { id: 1 };
      const educatorStudentRelationships = { [esr.id]: esr };
      const entities = { educatorStudentRelationships };
      const action = createEducatorStudentRelationshipSuccess(entities);

      // execute
      const newState = educatorStudentRelationshipsReducer(
        initialState,
        action
      );

      // verify
      const expectedState = esr;
      const actualState = newState[esr.id];
      expect(actualState).toEqual(expectedState);
    });
  });

  describe ('destroyEducatorStudentRelationshipSucces', () => {
    it('removes a educatorStudentRelationship from the store', () => {
      // setup
      const esr = { id: 1 };
      const otherEsr = { id: 2 };
      const educatorStudentRelationships = {
        [esr.id]: esr,
        [otherEsr.id]: otherEsr
      };
      const initialState = educatorStudentRelationships;
      const action = destroyEducatorStudentRelationshipSuccess(esr.id);

      // execute
      const newState = educatorStudentRelationshipsReducer(
        initialState,
        action
      );

      // verify
      const expectedState = { [otherEsr.id]: otherEsr };
      const actualState = newState;
      expect(actualState).toEqual(expectedState);
    });
  });
});


