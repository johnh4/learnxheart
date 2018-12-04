import React from 'react';
import ReactDOM from 'react-dom';
import Header from '.';
import { Header as HeaderComponent } from '.';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';
import { shallow } from 'enzyme';
import { renderWithProviders } from '../../utils/testUtils';
import { fireEvent, waitForElement } from 'react-testing-library';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = configureStore();
  ReactDOM.render(
    <Provider store={store}>
      <Header />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

describe('when a user is signed in', () => {
  it('contains the user name', () => {
    const { getByText } = setupHeaderWithSignedInUser();

    expect(getByText(user.firstName)).toBeInTheDocument();
  });

  it('contains a sign out link', () => {
    const { getByText } = setupHeaderWithSignedInUser();

    expect(getByText('Sign Out')).toBeInTheDocument();
  });

  it('does not have a sign in link', () => {
    const { queryByText } = setupHeaderWithSignedInUser();

    expect(queryByText('Sign In')).not.toBeInTheDocument();
  });

  it('allows a user to sign out via the sign out link', async () => {
    const { signOutLinkMock, getByText } = setupHeaderWithSignedInUser();
    const signOutLink = getByText('Sign Out');

    fireEvent.click(signOutLink);

    expect(signOutLinkMock).toHaveBeenCalled();
  });
});

describe('when a user is not signed in', () => {
  it('has a sign in link', () => {
    const { getByText } = setupHeaderWithoutUser();

    expect(getByText('Sign In')).toBeInTheDocument();
  });

  it('does not have a sign out link', () => {
    const { queryByText } = setupHeaderWithoutUser();

    expect(queryByText('Sign Out')).not.toBeInTheDocument();
  });
});

const user = {
  id: 1,
  token: "fake",
  firstName: "Clare",
  lastName: "Underwood"
}

function setupHeaderWithSignedInUser() {
  const signOutLinkMock = jest.fn();
  const render = renderWithProviders(
    <HeaderComponent
      userSignedIn={true}
      currentUser={user}
      signOutRequest={signOutLinkMock}
    />
  );
  return { ...render, signOutLinkMock };
}

function setupHeaderWithoutUser() {
  return renderWithProviders(
    <HeaderComponent
      userSignedIn={false}
    />
  );
}