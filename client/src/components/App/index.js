import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.scss';
import pinkPolygons from '../../images/pink-polygons.png';
import List from '../../List';
import Educators from '../Educators';
import SignIn from '../../containers/SignIn';
import { Router } from '@reach/router';
import Header from '../../containers/Header';

class App extends Component {

  render() {
    return (
      <div className="App" style={ { backgroundImage: `url(${pinkPolygons})` }}>
        <Header className="App__header"/>
        <div className="App__container">
          <Router>
            <Dashboard path="/" />
            <Educators path="/educators" />
            <SignIn path="/sign-in" />
            <NotFound default />
          </Router>
        </div>
      </div>
    );
  }
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
  )
}

function NotFound() {
  return (
    <div data-testid="not-found-view">
      Sorry! We couldn't find that page.
    </div>
  )
}

export default App;