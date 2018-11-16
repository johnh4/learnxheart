import React from 'react';
import { storiesOf } from '@storybook/react';
import { Header } from '.';
import { AppWrapper } from '../../components/App';

const AppDecorator = (storyFn) => (
  <AppWrapper>{storyFn()}</AppWrapper>
);

const stories = storiesOf('Header', module);

stories.addDecorator(AppDecorator);

stories.add('With no one signed in', () => (
  <Header
    userSignedIn={false}
    currentUser={null}
    classes='App__header'
    signOutRequest={() => {}}
    studentSignedIn={false}
    educatorSignedIn={false}
  />
));

stories.add('With a signed in educator', () => (
  <Header
    userSignedIn={true}
    currentUser={educator}
    classes='App__header'
    signOutRequest={() => {}}
    studentSignedIn={false}
    educatorSignedIn={true}
  />
));

stories.add('With a signed in student', () => (
  <Header
    userSignedIn={true}
    currentUser={student}
    classes='App__header'
    signOutRequest={() => {}}
    studentSignedIn={true}
    educatorSignedIn={false}
  />
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