import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowseCourses }  from '.';
import { AppWrapper} from '../../components/App';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';
import {
  MemoryRouter as Router,
  Route
} from 'react-router-dom';

const courses = {
  1: {
    id: 1,
    name: "Intro to Philosophy",
    educatorName: "Chelsea Ard",
    educator: 9,
    description:  "What is most real? Do humans have free will? Is there a best way to live? Is it better to be just or unjust (if one can get away with it)?",
    cardCount: 45,
    studentCount: 30,
    following: true
  },
  2: {
    id: 2,
    name: "Mathematics 101",
    educatorName: "Carlton Banks",
    educator: 10,
    description:  "Math is good, math is great. Math is nice, math oh boy. This is some mathy content. It's easy.",
    cardCount: 20,
    studentCount: 50,
    following: true
  },
  3: {
    id: 3,
    name: "Philosophy 201",
    educatorName: "Chelsea Ard",
    educator: 9,
    description:  "What is most real? Do humans have free will? Is there a best way to live? Is it better to be just or unjust (if one can get away with it)?",
    cardCount: 55,
    studentCount: 15,
    following: false
  },
  4: {
    id: 4,
    name: "Mathematics 201",
    educatorName: "Carlton Banks",
    educator: 10,
    description:  "Mathematics includes the study of such topics as quantity, structure, space, and change. Mathematicians seek and use patterns to formulate new conjectures.",
    cardCount: 30,
    studentCount: 25,
    following: false
  },
  5: {
    id: 5,
    name: "Philosophy 130",
    educatorName: "Chelsea Ard",
    educator: 9,
    description:  "Philosophy is the study of general and fundamental problems concerning matters such as existence, knowledge, values, reason, mind, and language.",
    cardCount: 29,
    studentCount: 20,
    following: true
  },
  6: {
    id: 6,
    name: "Mathematics 145",
    educatorName: "Carlton Banks",
    educator: 10,
    description:  "Mathematics includes the study of such topics as quantity, structure, space, and change. Mathematicians seek and use patterns to formulate new conjectures.",
    cardCount: 10,
    studentCount: 60,
    following: true
  }
}
const educators = {
  9:  { id: 9, firstName: "Chelsea", lastName: "Ard" },
  10:  { id: 10, firstName: "Carlton", lastName: "Banks" }
}

const initialState = {
  entities: {
    courses,
    educators
  },
  sessions: {
    currentUser: {
      id: 1,
      token: "fake",
      type: "Student"
    }
  }
}

const store = configureStore(initialState);

const reduxDecorator = (storyFn) => (
  <Provider store={store}>{storyFn()}</Provider>
)
const AppDecorator = (storyFn) => (
  <AppWrapper>{storyFn()}</AppWrapper>
);

const RouterDecorator = (storyFn) => (
  <Router initialEntries={['/browse/courses/1']}>
    {storyFn()}
  </Router>
)

const stories = storiesOf('BrowseCourses', module);

stories.addDecorator(reduxDecorator);
stories.addDecorator(AppDecorator);
stories.addDecorator(RouterDecorator);

stories.add('Without data', () => (
  <Route path='/' render={props => (
    <BrowseCourses {...props}/>
    )}
  />
));

stories.add('With data', () => (
  <Route path='/browse/courses' render={props => (
    <BrowseCourses courseIds={[1, 2, 3, 4, 5, 6]} {...props} />
    )}
  />
));