import c from '../constants/educators';

export const loadEducatorRequest = (educatorId) => {
  return {
    type: c.LOAD_EDUCATOR_REQUEST,
    educatorId
  }
}

export const loadEducatorsRequest = () => {
  return {
    type: c.LOAD_EDUCATORS_REQUEST
  }
}

export const loadEducatorsSuccess = (entities) => {
  return {
    type: c.LOAD_EDUCATORS_SUCCESS,
    entities
  }
}