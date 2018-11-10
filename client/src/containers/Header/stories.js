import React from 'react';
import { storiesOf } from '@storybook/react';
import { Header } from '.';
import App from '../../components/App';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';


storiesOf('Header', module)
  .add('With no one signed in', () => (
    <Header
      userSignedIn={false}
      currentUser={null}
      className='App__header'
      signOutRequest={() => {}}
      studentSignedIn={false}
      educatorSignedIn={false}
    />
  ))
  .add('With a signed in educator', () => (
    <Header
      userSignedIn={true}
      currentUser={educator}
      className='App__header'
      signOutRequest={() => {}}
      studentSignedIn={false}
      educatorSignedIn={true}
    />
  ))
  .add('With a signed in student', () => (
    <Header
      userSignedIn={true}
      currentUser={student}
      className='App__header'
      signOutRequest={() => {}}
      studentSignedIn={true}
      educatorSignedIn={false}
    />
  ))
  .add('In App', () => (
    <Provider store={store}>
      <App />
    </Provider>
  ));

const educator = {
  id: 1,
  email: "educator@example.com",
  token: "fake",
  firstName: "Ned",
  lastName: "Stark",
  type: "Educator"
}
const student = {
  id: 1,
  email: "student@example.com",
  token: "fake",
  firstName: "John",
  lastName: "Snow",
  type: "Student"
}

const store = configureStore();