import React from 'react';
import App from '.';
import { renderWithProviders } from '../../utils/testUtils';
import {
  fireEvent,
  waitForElement,
  within
} from 'react-testing-library';

describe('App', () => {
  test('renders without crashing', () => {
    const { getByText } = renderWithProviders(<App />);

    expect(getByText(/learn x heart/i)).toBeInTheDocument();
  });

  test('can navigate to the sign in page', async () => {
    const viewTestId = 'sign-in-view';
    const linkText = /Sign In/i;

    await expectToBeAbleToNavigateToPage(viewTestId, linkText);
  });

  test('can navigate to the educators page', async () => {
    const viewTestId = 'educators-view';
    const linkText = /Educators/i;

    await expectToBeAbleToNavigateToPage(viewTestId, linkText);
  });

  test('displays a message when a route is not found', () => {
    const { getByText } = renderWithProviders(<App />, {
      route: '/some-fake-route',
    });

    const message = /sorry/i;
    expect(getByText(message)).toBeInTheDocument();
  });
});

const expectToBeAbleToNavigateToPage = async (viewTestId, linkText) => {
  // setup the test
  const {getByTestId, queryByTestId } = renderWithProviders(<App />);
  expect(getByTestId('dashboard-view')).toBeInTheDocument();
  expect(queryByTestId(viewTestId)).not.toBeInTheDocument();
  const header = getByTestId('header');

  // execute the test
  fireEvent.click(within(header).getByText(linkText));

  // confirm page changes
  await waitForElement(() => getByTestId(viewTestId));
  expect(getByTestId(viewTestId)).toBeInTheDocument();
  expect(queryByTestId('dashboard-view')).not.toBeInTheDocument();
}
