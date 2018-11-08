import configureStore from '../store/configureStore';

export const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

export const setupStoreAndMockFetch = (responseData, initialState = null) => {
  const store = initialState ? configureStore(initialState) : configureStore();
  const mockedResponse = Promise.resolve(mockResponse(200, "ok", JSON.stringify(responseData)));
  spyOn(window, "fetch").and.returnValue(mockedResponse);
  return store;
}