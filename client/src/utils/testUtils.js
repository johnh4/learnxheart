import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { MemoryRouter } from 'react-router-dom';

export const renderWithProviders = (ui, { route = '/', initialState = {} } = {}) => {
  const store = configureStore(initialState);
  const providers = <Provider store={store}>
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  </Provider>;

  return {
    ...render(providers),
    store
  }
}