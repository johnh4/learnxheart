import React from 'react';
import PropTypes from 'prop-types';
import LandingPageView from '../../components/LandingPageView';
import Dashboard from '../../components/Dashboard';
import { connect } from 'react-redux';
import { userSignedIn } from '../../selectors/sessions';

function Home({ userSignedIn }) {
  return userSignedIn
    ? <Dashboard />
    : <LandingPageView />
}

const mapStateToProps = (state) => ({
  userSignedIn: userSignedIn(state)
});

Home.propTypes = {
  userSignedIn: PropTypes.bool
}

Home.defaultProps = {
  userSignedIn: () => {}
}

export default connect(mapStateToProps)(Home);
