import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

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
    <Form className="form">
      <label htmlFor="email">Email</label>
      <Field type="email" name="email" className="form-field" aria-label="email"/>
      <ErrorMessage name="email" component="div" />  

      <label htmlFor="password">Password</label>
      <Field type="password" name="password" aria-label="password"/>
      <ErrorMessage name="password" className="error" component="div" />  

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  )
}

SignInForm.propTypes = {
  onSubmit: PropTypes.func
}

export default SignInForm;
