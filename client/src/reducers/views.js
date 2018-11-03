import { API_ERROR } from '../actions/views';
export const SELECT = 'learnxheart/select';
export const TOGGLE = 'learnxheart/toggle';

const initialState = {
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
    default:
      return state;
  }
}

export const selectThing = () => ({
  type: SELECT
})

export const toggleSelect = () => ({
  type: TOGGLE
})