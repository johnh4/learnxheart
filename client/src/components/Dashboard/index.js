import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import List from '../../List';
import './styles.scss';

function Dashboard() {
  return (
    <header className="Dashboard App__dashboard App-header"
      data-testid="dashboard-view"
    >
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

export default Dashboard;