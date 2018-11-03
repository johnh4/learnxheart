import sinon from 'sinon';
import { loadEducatorsFlow, educatorsApi } from '../educators';
import { getEducators } from '../../reducers/educators';
import * as actions from '../../actions/educators';
import { runSaga } from 'redux-saga';
import configureStore from '../../store/configureStore';

describe("loadEducatorsFlow", function() {
  it("adds fetched educators to state when api call is successful", done => {
    // setup the test
    const store = configureStore();
    const educators = [{ id: 1 }, { id: 2 }];
    const data = educators;
    const mockedResponse = Promise.resolve(mockResponse(200, "ok", JSON.stringify(data)));
    spyOn(window, "fetch").and.returnValue(mockedResponse);

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
      // console.log('stete', store.getState());
      const actualErrorState = store.getState().views.error;
      // console.log('actualErrorState', actualErrorState);
      expect(actualErrorState).toEqual(expectedErrorState);
      done();
    });
  });

  xit("runs loadEducatorsSuccess when there are no api errors", async () => {
    const dispatched = [];
    const educators = [{ id: 1 }, { id: 2 }];
    const data = educators;
    const mockedResponse = Promise.resolve(mockResponse(200, "ok", JSON.stringify(data)));
    spyOn(window, "fetch").and.returnValue(mockedResponse);

    const result = await runSaga({
      dispatch: (action) => dispatched.push(action),
      getState: () => ({ state: 'test' }),
    }, loadEducatorsFlow).done;

    const expectedEducators = { "1": { id: 1 }, "2": { id: 2 } };
    expect(dispatched).toEqual([actions.loadEducatorsSuccess(expectedEducators)])
  });
});

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};