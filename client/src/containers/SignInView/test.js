import React from 'react';
import App from '../../components/App';
import SignInView from '.';
import { renderWithProviders } from '../../utils/testUtils';
import axios from 'axios';
import {
  fireEvent,
  waitForElement
} from 'react-testing-library';

jest.mock('axios');

describe('SignInView Container', () => {
  test('renders without crashing', () => {
    const { getByLabelText } = renderWithProviders(<SignInView />);

    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('enables an educator to sign in with valid credentials', async () => {
    const educator = {
      id: 1,
      email: 'educator@example.com',
      password: 'password',
      token: 'fakeToken',
      firstName: 'Tester',
      type: 'Educator'
    }
    await expectUserToBeAbleToSignIn(educator);
  });

  test('enables a student to sign in with valid credentials', async () => {
    const student = {
      id: 1,
      email: 'student@example.com',
      password: 'password',
      token: 'fakeToken',
      firstName: 'Tester',
      type: 'Student'
    }
    await expectUserToBeAbleToSignIn(student);
  });
});

/**
 * Test that the user can sign in via the form and be recognized as the correct type
 * @param {object} user User data for the test
 */
const expectUserToBeAbleToSignIn = async (user) => {
    // setup
    axios.mockReturnValue(new Promise(resolve => resolve({ data: user })))
    const {
      getByLabelText,
      getByText,
      queryByText,
      getByTestId,
      queryByTestId
    } = renderWithProviders(<App />, { route: '/sign-in'});
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const button = getByText(/submit/i);
    expect(queryByText(/Sign Out/i)).not.toBeInTheDocument();

    // test
    fireEvent.change(emailInput, { target: { value: user.email }})
    fireEvent.change(passwordInput, { target: { value: user.password }})
    fireEvent.click(button);

    // verify sign in
    await expectUserToBeSignedIn(user, getByText);
    if (user.type === "Student") {
      expect(getByTestId(/student-header-icon/i)).toBeInTheDocument();
      expect(queryByTestId('educator-header-icon')).not.toBeInTheDocument();
    } else if (user.type === "Educator") {
      expect(getByTestId(/educator-header-icon/i)).toBeInTheDocument();
      expect(queryByTestId('student-header-icon')).not.toBeInTheDocument();
    }
}

/**
 * Verify that the user signed in
 * @param {object}   user      The user expected to be signed in
 * @param {function} getByText The react-testing-library getByText function
 */
const expectUserToBeSignedIn = async (user, getByText) => {
  await waitForElement(() => getByText(/Sign Out/i));
  expect(axios).toHaveBeenCalled();
  expect(getByText(/Sign Out/i)).toBeInTheDocument();
  expect(getByText(user.firstName)).toBeInTheDocument();
}