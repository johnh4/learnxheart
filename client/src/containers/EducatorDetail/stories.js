import React from 'react';
import { storiesOf } from '@storybook/react';
import { EducatorDetail }  from '.';
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
  }
}
const educators = {
  9:  { id: 9, firstName: "Chelsea", lastName: "Ard" }
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
  <AppWrapper userSignedIn={true}>{storyFn()}</AppWrapper>
);

const RouterDecorator = (storyFn) => (
  <Router initialEntries={['/browse/educators/1']}>
    {storyFn()}
  </Router>
)

const stories = storiesOf('BrowseEducators/EducatorDetail', module);

stories.addDecorator(reduxDecorator);
stories.addDecorator(AppDecorator);
stories.addDecorator(RouterDecorator);

stories.add('Without data', () => (
  <Route path='/browse/educators/1' render={props => (
    <EducatorDetail {...props} />
    )}
  />
));

const educator = educators[9];

stories.add('With data', () => (
  <Route path='/browse/educators/1' render={props => (
    <EducatorDetail
      educator={educator}
      {...props}
    />
    )}
  />
));


