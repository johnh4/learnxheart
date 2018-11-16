import { selectCourses } from '../../selectors/courses';
import * as actions from '../../actions/courses';
import configureStore from '../../store/configureStore';
import axios from 'axios';

jest.mock('axios');

describe("loadCoursesFlow", function() {
  it("adds fetched courses to state when api call is successful", done => {
    // setup the test
    const courses = [{ id: 1 }, { id: 2 }];
    const response = { data: courses }
    const store = configureStore();
    axios.mockReturnValue(new Promise(resolve => resolve(response)));

    // execute the test by triggering the watcher saga
    store.dispatch(actions.loadCoursesRequest());

    // verify state changes
    const expectedCourses = { "1": { id: 1 }, "2": { id: 2 } };
    setTimeout(() => {
      const actualCourses = selectCourses(store.getState());
      expect(actualCourses).toEqual(expectedCourses);
      done();
    });
  });

  it("dispatches api error when the api errors", done => {
    // setup the test
    const store = configureStore();
    axios.mockReturnValue(new Promise((resolve, reject) => reject('Not Found')));

    // execute the test by triggering the watcher saga
    store.dispatch(actions.loadCoursesRequest());

    // verify state changes
    setTimeout(() => {
      const expectedErrorState = 'Not Found';
      const actualErrorState = store.getState().views.error;
      expect(actualErrorState).toEqual(expectedErrorState);
      done();
    });
  });
});
