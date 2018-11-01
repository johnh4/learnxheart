import merge from 'lodash/merge';
import { createSelector } from 'reselect';

const INITIAL_EDUCATORS = {};

const educators = (state = INITIAL_EDUCATORS, action) => {
  switch (action.type) {
    default:
      if (action.educators) {
        return merge({}, state, action.educators);
      }
      return state;
  }
}

export default educators;

export const getEducators = (state) => state.entities.educators;
export const getEducatorIds = createSelector(
  getEducators,
  educators => Object.keys(educators)
);