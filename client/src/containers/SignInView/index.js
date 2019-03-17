import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignedIn } from '../../selectors/sessions';
import { signInRequest } from '../../actions/sessions';
import SignInForm from '../../components/SignInForm';
import { Redirect } from 'react-router-dom';
import './styles.scss';
import authentication from '../../images/authentication with beta.svg';

export function SignInView({ signInRequest, userSignedIn }) {
  const autoSubmit = () => {
    signInRequest('tyrell@example.net', 'password');
  }

  const handleSubmit = ({ email, password }, { setSubmitting }) => {
    signInRequest(email, password, setSubmitting);
  }


  const renderSignInView = () => {
    return (
      <div className="SignInView" data-testid="sign-in-view">
        <section
          className="SignInView__illustration-section SignInView__section"
        >
          <img
            src={authentication}
            className="SignInView__illustration"
            alt="Person signing in"
            onClick={autoSubmit}
          />
        </section>
        <section className="SignInView__form-section SignInView__section">
          <SignInForm onSubmit={handleSubmit}/>
        </section>
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