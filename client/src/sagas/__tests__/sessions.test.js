import * as actions from '../../actions/sessions';
import axios from 'axios';
import configureStore from '../../store/configureStore';

jest.mock('axios');

describe("signInFlow", function() {
  it("adds the user to state upon a successful api request", done => {
    // setup the test
    const user = { id: 1, token: "fakeToken" };
    const store = configureStore();
    axios.mockReturnValue(new Promise(resolve => resolve({ data: user})));

    // execute the test by triggering the watcher saga
    store.dispatch(actions.signInRequest());

    // verify state changes
    const expectedState = {
      currentUser: { id: 1, token: "fakeToken"}
    };
    setTimeout(() => {
      const actualState = store.getState().sessions;
      expect(actualState).toEqual(expectedState);
      done();
    });
  });

  it("adds the user to localStorage upon a successful api request", done => {
    // setup the test
    const user = { id: 1, token: 'fakeToken' };
    const store = configureStore();
    axios.mockReturnValue(new Promise(resolve => resolve({ data: user })));

    // execute the test by triggering the watcher saga
    store.dispatch(actions.signInRequest());

    // verify state changes
    setTimeout(() => {
      const userFromStorage = JSON.parse(localStorage.getItem('user'));
      expect(userFromStorage).toEqual(user);
      done();
    });
  });
});

describe("signOutFlow", function() {
  it("removes the user from state", done => {
    // setup the test
    const user = { id: 1, token: "fakeToken" };
    const initialState = { sessions: { currentUser: user } };
    const store = configureStore(initialState);
    axios.mockReturnValue(new Promise(resolve => resolve({})));

    // execute the test by triggering the watcher saga
    store.dispatch(actions.signOutRequest(user));

    // verify state changes
    const expectedState = { currentUser: null };
    setTimeout(() => {
      const actualState = store.getState().sessions;
      expect(actualState).toEqual(expectedState);
      done();
    });
  });

  it("removes the user from localStorage", done => {
    // setup the test
    const user = { id: 1, token: 'fakeToken' };
    localStorage.setItem('user', JSON.stringify(user));
    const initialState = { sessions: { currentUser: user } };
    const store = configureStore(initialState);
    axios.mockReturnValue(new Promise(resolve => resolve({})));

    // execute the test by triggering the watcher saga
    store.dispatch(actions.signOutRequest(user));

    // verify localStorage change
    setTimeout(() => {
      const userFromStorage = JSON.parse(localStorage.getItem('user'));
      expect(userFromStorage).toEqual(null);
      done();
    });
  });
});