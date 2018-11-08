import { getEducators } from '../../reducers/educators';
import * as actions from '../../actions/educators';
import configureStore from '../../store/configureStore';
import { mockResponse, setupStoreAndMockFetch } from '../../utils/mockResponse';

describe("loadEducatorsFlow", function() {
  it("adds fetched educators to state when api call is successful", done => {
    // setup the test
    const educators = [{ id: 1 }, { id: 2 }];
    const store = setupStoreAndMockFetch(educators);

    // execute the test by triggering the watcher saga
    store.dispatch(actions.loadEducatorsRequest());

    // verify state changes
    const expectedEducators = { "1": { id: 1 }, "2": { id: 2 } };
    setTimeout(() => {
      const actualEducators = getEducators(store.getState());
      expect(actualEducators).toEqual(expectedEducators);
      done();
    });
  });

  it("dispatches api error when the api errors", done => {
    // setup the test
    const store = configureStore();
    const mockedResponse = Promise.resolve(mockResponse(404, "Not Found", []));
    spyOn(window, "fetch").and.returnValue(mockedResponse);

    // execute the test by triggering the watcher saga
    store.dispatch(actions.loadEducatorsRequest());

    // verify state changes
    setTimeout(() => {
      const expectedErrorState = 'Not Found';
      const actualErrorState = store.getState().views.error;
      expect(actualErrorState).toEqual(expectedErrorState);
      done();
    });
  });
});