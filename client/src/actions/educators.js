export const LOAD_EDUCATOR_REQUEST = 'learnxheart/load_educator_request';
export const LOAD_EDUCATORS_REQUEST = 'learnxheart/load_educators_request';
export const LOAD_EDUCATORS_SUCCESS = 'learnxheart/load_educators_success';

export const constants = {
  LOAD_EDUCATOR_REQUEST,
  LOAD_EDUCATORS_REQUEST,
  LOAD_EDUCATORS_SUCCESS,
}

export const loadEducatorRequest = (educatorId) => {
  return {
    type: LOAD_EDUCATOR_REQUEST,
    educatorId
  }
}

export const loadEducatorsRequest = () => {
  return {
    type: LOAD_EDUCATORS_REQUEST
  }
}

export const loadEducatorsSuccess = (educators) => {
  return {
    type: LOAD_EDUCATORS_SUCCESS,
    educators
  }
}