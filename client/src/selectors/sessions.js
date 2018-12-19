import { createSelector } from 'reselect';

/**
 * Uses state to return the currentUser
 * @param  {object}   state
 * @return {object|null}          The current user
 */
export const currentUser = (state) => state.sessions.currentUser;

/**
 * Uses state to return the current user's auth token
 * @param  {object}      state
 * @return {string|null}          The current user's auth token
 */
export const token = createSelector(currentUser, (user) => !!user ? user.token : null);

/**
 * Uses state to return the current user's first and last name
 * @param  {object}      state
 * @return {string|null}          The current user's name
 */
export const currentUserName = createSelector(
  currentUser,
  (user) => !!user ? `${user.firstName} ${user.lastName}` : null
);

/**
 * Uses state to return whether there is a user logged in
 * @param  {object}      state
 * @return {boolean}             Whether or not a user is logged in
 */
export const userSignedIn = createSelector(
  currentUser,
  token,
  (user, authToken) => !!user && !!authToken
);

/**
 * Uses state to return whether there is an educator logged in
 * @param  {object}      state
 * @return {boolean}             Whether or not an educator is logged in
 */
export const educatorSignedIn = createSelector(
  currentUser,
  userSignedIn,
  (user, signedIn) => !!user && (user.type === "Educator") && !!signedIn
);

/**
 * Uses state to return whether there is a student logged in
 * @param  {object}      state
 * @return {boolean}             Whether or not a student is logged in
 */
export const studentSignedIn = createSelector(
  currentUser,
  userSignedIn,
  (user, signedIn) => !!user && (user.type === "Student") && !!signedIn
);

/**
 * Uses state to return the current student
 * @param  {object}      state
 * @return {object|null}             The current student or null
 */
export const currentStudent = createSelector(
  currentUser,
  studentSignedIn,
  (user, studentIsSignedIn) => (!!user && studentIsSignedIn) ? user : null
)