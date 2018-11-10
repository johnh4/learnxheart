import React from 'react';
import ReactDOM from 'react-dom';
import Header from '.';
import { Header as HeaderComponent } from '.';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';
import { shallow } from 'enzyme';

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
    const { wrapper, user } = setupHeaderWithSignedInUser();

    const actualName = wrapper.find('.user-name').text();
    const userName = user.firstName;
    expect(actualName).toEqual(userName);
  });

  it('contains a sign out link', () => {
    const { wrapper } = setupHeaderWithSignedInUser();

    expect(wrapper.exists('.sign-out')).toEqual(true);
  });

  it('does not have a sign in link', () => {
    const { wrapper } = setupHeaderWithSignedInUser();

    expect(wrapper.exists('.sign-in')).toEqual(false);
  });

  it('allows a user to sign out via the sign out link', () => {
    // setup the component
    const signOutLinkMock = jest.fn();
    const user = {
      id: 1,
      token: "fake",
      firstName: "Clare",
      lastName: "Underwood"
    }
    const wrapper = shallow(
      <HeaderComponent
        userSignedIn={true}
        currentUser={user}
        signOutRequest={signOutLinkMock}
      />
    );

    // click the sign out link
    wrapper
      .find('.sign-out')
      .simulate('click');

    // execute the test
    expect(signOutLinkMock).toHaveBeenCalled();
  });
});

describe('when a user is not signed in', () => {
  it('has a sign in link', () => {
    const wrapper = setupHeaderWithoutUser();

    expect(wrapper.exists('.sign-in')).toEqual(true);
  });

  it('does not have a sign out link', () => {
    const wrapper = setupHeaderWithoutUser();

    expect(wrapper.exists('.sign-out')).toEqual(false);
  });
});

function setupHeaderWithSignedInUser() {
  const user = {
    id: 1,
    token: "fake",
    firstName: "Clare",
    lastName: "Underwood"
  }
  const wrapper = shallow(
    <HeaderComponent userSignedIn={true} currentUser={user} />
  );
  return { wrapper, user };
}

function setupHeaderWithoutUser() {
  const wrapper = shallow(
    <HeaderComponent userSignedIn={false} />
  );
  return wrapper;
}