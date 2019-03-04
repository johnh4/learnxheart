import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import './styles.scss';

export function SignInForm({onSubmit}) {
  const initialValues = {
    email: '',
    password: ''
  }

  const signInSchema = yup.object().shape({
    password: yup
      .string()
      .min(6, 'Your password must be at least 6 characters')
      .required('Please enter your password'),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Please enter an email address')
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      validateOnBlur
      onSubmit={onSubmit}
      render={SignInFormComponent}
    />
  )
}

function SignInFormComponent(props) {
  const { isSubmitting } = props

  return (
    <Form className="SignInForm">
      <div className="SignInForm__title">Welcome back</div>
      <div className="SignInForm__fields">
        <label className="SignInForm__label" htmlFor="email">
          Email
        </label>
        <Field
          className="SignInForm__field form-field"
          type="email"
          name="email"
          aria-label="email"
          placeholder="you@example.com"
        />
        <ErrorMessage
          className="SignInForm__error"
          name="email"
          component="div"
        />  

        <label className="SignInForm__label" htmlFor="password">
          Password
        </label>
        <Field
          className="SignInForm__field"
          type="password"
          name="password"
          aria-label="password"
          placeholder="password"
        />
        <ErrorMessage
          className="SignInForm__error"
          name="password"
          component="div"
        />  
        <div className="SignInForm__forgot SignInForm__helper-text">
          Forget your password?
        </div>
      </div>

      <button
        className="SignInForm__submit LightButton"
        type="submit"
        disabled={isSubmitting}
      >
        SIGN IN
      </button>

      <div className="SignInForm__sign-up SignInForm__helper-text">
        Don't have an account? Sign up!
      </div>
    </Form>
  )
}

SignInForm.propTypes = {
  onSubmit: PropTypes.func
}

export default SignInForm;
