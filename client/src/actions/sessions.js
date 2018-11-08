import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS
} from '../constants/sessions';

export const signInRequest = (email, password) => {
  return {
    type: SIGN_IN_REQUEST,
    email,
    password
  }
}

export const signInSuccess = (user) => {
  return {
    type: SIGN_IN_SUCCESS,
    user
  }
}

export const signInError = (error) => {
  return {
    type: SIGN_IN_ERROR,
    error
  }
}

export const signOutRequest = (currentUser) => {
  return {
    type: SIGN_OUT_REQUEST,
    currentUser
  }
}

export const signOutSuccess = () => {
  return {
    type: SIGN_OUT_SUCCESS
  }
}