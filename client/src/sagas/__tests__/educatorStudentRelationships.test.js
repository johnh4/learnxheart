import * as actions from '../../actions/educatorStudentRelationships';
import configureStore from '../../store/configureStore';
import axios from 'axios';
import {
  selectEducatorStudentRelationships
} from '../../selectors/educatorStudentRelationships';

jest.mock('axios');

describe("destroyEducatorStudentRelationshipFlow", function() {
  it('removes the esr from state when api call is successful', done => {
    // setup the test
    const esr1 = { id: 1 };
    const esr2 = { id: 2 };
    const esrs = { [`${esr1.id}`]: esr1, [`${esr2.id}`]: esr2 };
    const initialState = {
      entities: {
        educatorStudentRelationships: esrs
      },
      sessions: {
        currentUser: {
          token: 'fake'
        }
      }
    }
    const store = configureStore(initialState);
    const response = { status: 204 };
    axios.mockReturnValue(new Promise(resolve => resolve(response)));

    // execute the test by triggering the watcher saga
    const action = actions.destroyEducatorStudentRelationshipRequest(esr1.id);
    store.dispatch(action);

    // verify state changes
    const expectedEsrs = { [`${esr2.id}`]: esr2 };
    setTimeout(() => {
      const actualEsrs = selectEducatorStudentRelationships(store.getState());
      expect(actualEsrs).toEqual(expectedEsrs);
      done();
    });
  });
});

describe("createEducatorStudentRelationshipFlow", function() {
  it('adds the esr to state when api call is successful', done => {
    // setup the test
    const esr = { educatorId: 1, studentId: 2 };
    const initialState = {
      entities: {
        educatorStudentRelationships: {}
      },
      sessions: {
        currentUser: {
          token: 'fake'
        }
      }
    }
    const store = configureStore(initialState);
    const esrId = 5;
    const createdEsr = { ...esr, id: esrId };
    const response = { data: { ...createdEsr } };
    axios.mockReturnValue(new Promise(resolve => resolve(response)));

    // execute the test by triggering the watcher saga
    const action = actions.createEducatorStudentRelationshipRequest(esr);
    store.dispatch(action);

    // verify state changes
    const expectedEsrs = { [`${esrId}`]: createdEsr };
    setTimeout(() => {
      const actualEsrs = selectEducatorStudentRelationships(store.getState());
      expect(actualEsrs).toEqual(expectedEsrs);
      done();
    });
  });
});

