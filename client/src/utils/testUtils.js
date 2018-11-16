import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router'

export const renderWithProviders = (ui, { route = '/', initialState = {} } = {}) => {
  const history = createHistory(createMemorySource(route));
  const store = configureStore(initialState);
  const providers = <Provider store={store}>
    <LocationProvider history={history}>{ui}</LocationProvider>
  </Provider>;

  return {
    ...render(providers),
    history,
    store
  }
}