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

    expect(getByText(/learn/i)).toBeInTheDocument();
  });

  describe('navigation', () => {
    describe('when signed in', () => {
      xtest('can navigate to the my courses page', async () => {
        const viewTestId = 'my-courses-view';
        const linkText = /Courses/i;

        await expectToBeAbleToNavigateToPageAsUser(viewTestId, linkText);
      });

      test('can navigate to the browse courses page', async () => {
        // setup
        const viewTestId = 'browse-courses-view';
        const linkText = /Browse Courses/i;
        const initialState = {
          sessions: { currentUser: { id: 1, token: 'fakeToken' } }
        }
        const { getByTestId } = renderWithProviders(
          <App />,
          { initialState, route: '/courses' }
        );
        await waitForElement(() => getByTestId('my-courses-view'));

        // execute the test
        const pageHeader = getByTestId('page-header-actions');
        fireEvent.click(within(pageHeader).getByText(linkText));

        // confirm page changes
        await waitForElement(() => getByTestId(viewTestId));
        expect(getByTestId(viewTestId)).toBeInTheDocument();
      });
    });
    describe('when not signed in', () => {
      test('can navigate to the sign in page', async () => {
        const viewTestId = 'sign-in-view';
        const linkText = /Sign In/i;

        await expectToBeAbleToNavigateToPageAsGuest(viewTestId, linkText);
      });

      xtest('can navigate to the educators page', async () => {
        const viewTestId = 'educators-view';
        const linkText = /Educators/i;

        await expectToBeAbleToNavigateToPageAsGuest(viewTestId, linkText);
      });

      xtest('cannot see the my courses page', async () => {
        const viewTestId = 'my-courses-view';
        const linkText = /Courses/i;

        await expectToNotBeAbleToNavigateToPage(viewTestId, linkText);
      });

      test('displays a message when a route is not found', () => {
        const { getByText } = renderWithProviders(<App />, {
          route: '/some-fake-route',
        });

        const message = /sorry/i;
        expect(getByText(message)).toBeInTheDocument();
      });
    });
  });
});

const expectToBeAbleToNavigateToPageAsGuest = async (viewTestId, linkText) => {
  const initialState = {};
  await expectToBeAbleToNavigateToPage(viewTestId, linkText, initialState);
}

const expectToBeAbleToNavigateToPageAsUser = async (viewTestId, linkText) => {
  const initialState = {
    sessions: { currentUser: { id: 1, token: 'fakeToken' } }
  }
  await expectToBeAbleToNavigateToPage(viewTestId, linkText, initialState);
}

const expectToBeAbleToNavigateToPage = async (viewTestId, linkText, initialState) => {
  // setup the test
  const { getByTestId, queryByTestId } = renderWithProviders(
    <App />,
    { initialState }
  );
  expect(getByTestId('landing-page-view')).toBeInTheDocument();
  expect(queryByTestId(viewTestId)).not.toBeInTheDocument();
  const header = getByTestId('header');

  // execute the test
  fireEvent.click(within(header).getByText(linkText));

  // confirm page changes
  await waitForElement(() => getByTestId(viewTestId));
  expect(getByTestId(viewTestId)).toBeInTheDocument();
  expect(queryByTestId('dashboard-view')).not.toBeInTheDocument();
}

const expectToNotBeAbleToNavigateToPage = async (viewTestId, linkText) => {
  // setup the test
  const { getByTestId, queryByTestId } = renderWithProviders(<App />, {route: '/'});
  expect(getByTestId('dashboard-view')).toBeInTheDocument();
  expect(queryByTestId(viewTestId)).not.toBeInTheDocument();
  const header = getByTestId('header');

  // execute the test
  fireEvent.click(within(header).getByText(linkText));

  // confirm page changes
  await waitForElement(() => getByTestId('sign-in-view'));
  expect(getByTestId('sign-in-view')).toBeInTheDocument();
  expect(queryByTestId(viewTestId)).not.toBeInTheDocument();
}