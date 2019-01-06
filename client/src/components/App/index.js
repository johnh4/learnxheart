import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import logo from '../../logo.svg';
import './App.scss';
import List from '../../List';
import Educators from '../Educators';
import SignInView from '../../containers/SignInView';
import Header from '../../containers/Header';
import CoursesView from '../../containers/CoursesView';
import ProtectedRoute from '../../containers/ProtectedRoute';
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
          <Route path="/" exact component={Dashboard} />
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
      <AppContents />
    </AppWrapperContainer>
  );
}

function Dashboard() {
  return (
    <header className="App-header" data-testid="dashboard-view">
        <li className='Nav__item'>
          <Link to='/educators' className='Link Nav__link'>
            Educators
          </Link>
        </li>
        <li className='Nav__item'>
          <Link to='/courses' className='Link Nav__link'>
            Courses
          </Link>
        </li>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <List />
    </header>
  );
}

function NotFound() {
  return (
    <div data-testid="not-found-view">
      Sorry! We couldn't find that page.
    </div>
  );
}

export default App;