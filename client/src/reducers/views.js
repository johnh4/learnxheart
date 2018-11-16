import uniq from 'lodash/uniq';
import {
  API_ERROR,
  ADD_COURSE_FILTER,
  REMOVE_COURSE_FILTER
} from '../constants/views';
export const SELECT = 'learnxheart/select';
export const TOGGLE = 'learnxheart/toggle';

const initialState = {
  filters: {
    courses: []
  },
  selected: false,
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT:
      return {
        ...state,
        selected: true
      }
    case TOGGLE:
      return {
        ...state,
        selected: !state.selected
      }
    case API_ERROR:
      return {
        ...state,
        error: action.error
      }
    case ADD_COURSE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          courses: uniq([...state.filters.courses, action.filter])
        }
      }
    case REMOVE_COURSE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          courses: state.filters.courses.filter(
            filter => (filter !== action.filter)
          )
        }
      }
    default:
      return state;
  }
}

export const selectThing = () => ({
  type: SELECT
});

export const toggleSelect = () => ({
  type: TOGGLE
});