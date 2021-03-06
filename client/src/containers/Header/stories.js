import React from 'react';
import { storiesOf } from '@storybook/react';
import { Header } from '.';
import { AppWrapper } from '../../components/App';
import { MemoryRouter as Router } from 'react-router-dom';

const AppDecorator = (storyFn) => (
  <AppWrapper userSignedIn={true}>{storyFn()}</AppWrapper>
);
const RouterDecorator = (storyFn) => (
  <Router initialEntries={['/']}>
    {storyFn()}
  </Router>
)

const stories = storiesOf('Header', module);

stories.addDecorator(RouterDecorator);

stories.add('With no one signed in', () => (
  <AppWrapper userSignedIn={false}>
    <Header
      userSignedIn={false}
      currentUser={null}
      classes='App__header'
      signOutRequest={() => {}}
      studentSignedIn={false}
      educatorSignedIn={false}
    />
  </AppWrapper>
));

stories.add('With a signed in educator', () => (
  <AppWrapper userSignedIn={true}>
    <Header
      userSignedIn={true}
      currentUser={educator}
      classes='App__header'
      signOutRequest={() => {}}
      studentSignedIn={false}
      educatorSignedIn={true}
    />
  </AppWrapper>
));

stories.add('With a signed in student', () => (
  <AppWrapper userSignedIn={true}>
    <Header
      userSignedIn={true}
      currentUser={student}
      classes='App__header'
      signOutRequest={() => {}}
      studentSignedIn={true}
      educatorSignedIn={false}
    />
  </AppWrapper>
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