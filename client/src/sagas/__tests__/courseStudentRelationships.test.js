import * as actions from '../../actions/courseStudentRelationships';
import configureStore from '../../store/configureStore';
import axios from 'axios';
import {
  selectCourseStudentRelationships
} from '../../selectors/courseStudentRelationships';

jest.mock('axios');

describe("destroyCourseStudentRelationshipFlow", function() {
  it('removes the csr from state when api call is successful', done => {
    // setup the test
    const csr1 = { id: 1 };
    const csr2 = { id: 2 };
    const csrs = { [`${csr1.id}`]: csr1, [`${csr2.id}`]: csr2 };
    const initialState = {
      entities: {
        courseStudentRelationships: csrs
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
    const action = actions.destroyCourseStudentRelationshipRequest(csr1.id);
    store.dispatch(action);

    // verify state changes
    const expectedCsrs = { [`${csr2.id}`]: csr2 };
    setTimeout(() => {
      const actualCsrs = selectCourseStudentRelationships(store.getState());
      expect(actualCsrs).toEqual(expectedCsrs);
      done();
    });
  });
});

describe("createCourseStudentRelationshipFlow", function() {
  it('adds the csr to state when api call is successful', done => {
    // setup the test
    const csr = { courseId: 1, studentId: 2 };
    const initialState = {
      entities: {
        courseStudentRelationships: {}
      },
      sessions: {
        currentUser: {
          token: 'fake'
        }
      }
    }
    const store = configureStore(initialState);
    const csrId = 5;
    const createdCsr = { ...csr, id: csrId };
    const response = { data: { ...createdCsr } };
    axios.mockReturnValue(new Promise(resolve => resolve(response)));

    // execute the test by triggering the watcher saga
    const action = actions.createCourseStudentRelationshipRequest(csr);
    store.dispatch(action);

    // verify state changes
    const expectedCsrs = { [`${csrId}`]: createdCsr };
    setTimeout(() => {
      const actualCsrs = selectCourseStudentRelationships(store.getState());
      expect(actualCsrs).toEqual(expectedCsrs);
      done();
    });
  });
});
