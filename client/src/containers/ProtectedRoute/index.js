import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignedIn } from '../../selectors/sessions';
import SignInView from '../SignInView';
import { Route } from "react-router-dom";

function ProtectedRoute({ component: Component, userSignedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        userSignedIn
          ? <Component {...props} {...rest} />
          : (<SignInView />)
      }
    />
  );
}

ProtectedRoute.propTypes = {
  userSignedIn: PropTypes.bool.isRequired
}

ProtectedRoute.defaultProps = {
  userSignedIn: false
}

const mapStateToProps = (state) => ({
  userSignedIn: userSignedIn(state)
});

export default connect(mapStateToProps)(ProtectedRoute);