import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignedIn } from '../../selectors/sessions';
import SignInView from '../SignInView';

function ProtectedRoute({ userSignedIn, renderComponent, ...otherProps }) {
  if (userSignedIn) {
    return (
      <React.Fragment>
        {renderComponent(otherProps)}
      </React.Fragment>
    )
  } else {
    return (
      <SignInView />
    )
  }
}

ProtectedRoute.propTypes = {
  userSignedIn: PropTypes.bool.isRequired,
  renderComponent: PropTypes.func.isRequired
}

ProtectedRoute.defaultProps = {
  userSignedIn: false
}

const mapStateToProps = (state) => ({
  userSignedIn: userSignedIn(state)
});

export default connect(mapStateToProps)(ProtectedRoute);