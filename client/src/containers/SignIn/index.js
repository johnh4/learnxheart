import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignedIn } from '../../reducers/sessions';
import { signInRequest } from '../../actions/sessions';
import SignInForm from '../../components/SignInForm';
import { Redirect } from '@reach/router';

export function SignIn({ signInRequest, userSignedIn }) {
  const autoSubmit = () => {
    signInRequest("jehowl4+educator@gmail.com", "password");
  }

  const handleSubmit = ({ email, password }, { setSubmitting }) => {
    signInRequest(email, password, setSubmitting);
  }


  const renderSignInPage = () => {
    return (
      <div data-testid="sign-in-view">
        This is the sign in page.
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
    return renderSignInPage();
  }
}

SignIn.propTypes = {
  signInRequest: PropTypes.func,
  userSignedIn: PropTypes.bool
}

SignIn.defaultProps = {
  userSignedIn: false
}

const mapStateToProps = (state) => ({
  userSignedIn: userSignedIn(state)
});

const mapDispatchToProps = {
  signInRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);