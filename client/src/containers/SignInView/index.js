import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignedIn } from '../../selectors/sessions';
import { signInRequest } from '../../actions/sessions';
import SignInForm from '../../components/SignInForm';
import { Redirect } from 'react-router-dom';

export function SignInView({ signInRequest, userSignedIn }) {
  const autoSubmit = () => {
    signInRequest('tyrell@example.net', 'password');
  }

  const handleSubmit = ({ email, password }, { setSubmitting }) => {
    signInRequest(email, password, setSubmitting);
  }


  const renderSignInView = () => {
    return (
      <div data-testid="sign-in-view">
        This is the sign in view.
        <div onClick={autoSubmit}>
          Sign in
        </div>
        <SignInForm onSubmit={handleSubmit}/>
      </div>
    )
  }

  if (userSignedIn) {
    return <Redirect to='/' noThrow />
  } else {
    return renderSignInView();
  }
}

SignInView.propTypes = {
  signInRequest: PropTypes.func,
  userSignedIn: PropTypes.bool
}

SignInView.defaultProps = {
  userSignedIn: false
}

const mapStateToProps = (state) => ({
  userSignedIn: userSignedIn(state)
});

const mapDispatchToProps = {
  signInRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInView);