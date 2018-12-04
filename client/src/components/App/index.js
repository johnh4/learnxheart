import React, { Fragment } from 'react';
import logo from '../../logo.svg';
import './App.scss';
import pinkPolygons from '../../images/pink-polygons.png';
import List from '../../List';
import Educators from '../Educators';
import SignInView from '../../containers/SignInView';
import { Router } from '@reach/router';
import Header from '../../containers/Header';
import CoursesView from '../../containers/CoursesView';
import ProtectedRoute from '../../containers/ProtectedRoute';

export function AppWrapper({ children }) {
  return (
    <div className="App" style={ { backgroundImage: `url(${pinkPolygons})` }}>
      {children}
    </div>
  );
}

function AppContents() {
  return(
    <div className="App__contents">
      <Header classes="App__header"/>
      <div className="App__container">
        <Router primary={false}>
          <Dashboard path="/" />
          <Educators path="/educators" />
          <SignInView path="/sign-in" />
          <NotFound default />

          <ProtectedRoute
            path="/courses"
            tab="My Courses"
            renderComponent={(props) => <CoursesView {...props} />}
          />
          <ProtectedRoute
            path="/courses/browse"
            tab="Browse Courses"
            renderComponent={(props) => <CoursesView {...props} />}
          />
        </Router>
      </div>
    </div>
  );
}

function App() {
  return(
    <AppWrapper>
      <AppContents />
    </AppWrapper>
  );
}

function Dashboard() {
  return (
    <header className="App-header" data-testid="dashboard-view">
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