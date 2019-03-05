import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import logo from '../../logo.svg';
import './App.scss';
import Educators from '../Educators';
import SignInView from '../../containers/SignInView';
import Header from '../../containers/Header';
import CoursesView from '../../containers/CoursesView';
import ProtectedRoute from '../../containers/ProtectedRoute';
import Home from '../../containers/Home';
import BrowseView from '../../components/BrowseView';
import { Link } from 'react-router-dom';
import {
  Route,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import { userSignedIn } from '../../selectors/sessions';

export function AppWrapper({ children, userSignedIn }) {
  return (
    <div className={`App ${userSignedIn ? 'App_signed-in' : 'App_guest'}`}>
      {children}
    </div>
  );
}
AppWrapper.propTypes = {
  userSignedIn: PropTypes.bool
}
AppWrapper.defaultProps = {
  userSignedIn: false
}

const mapStateToProps = (state) => ({
  userSignedIn: userSignedIn(state)
});

const AppWrapperContainer = connect(mapStateToProps)(AppWrapper);

function AppContents() {
  return(
    <div className="App__contents">
      <Header classes="App__header"/>
      <div className="App__container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/educators" component={Educators} />
          <Route path="/sign-in" component={SignInView} />

          <ProtectedRoute
            path="/courses"
            exact
            tab="My Courses"
            component={CoursesView}
          />
          <ProtectedRoute
            path="/courses/browse"
            tab="Browse Courses"
            component={CoursesView}
          />

          <ProtectedRoute path="/browse" component={BrowseView} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}


function App() {
  return(
    <AppWrapperContainer>
      <Helmet>
        <title>Learn X Heart</title>
        <meta
          name="description"
          content="Spaced repetition for classrooms"
        />
      </Helmet>
      <AppContents />
    </AppWrapperContainer>
  );
}

function NotFound() {
  return (
    <div className="NotFound App__not-found" data-testid="not-found-view">
      Sorry! We couldn't find that page.
    </div>
  );
}

export default App;