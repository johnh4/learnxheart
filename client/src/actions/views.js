export const API_ERROR = 'learnxheart/api_error';

export const constants = {
  API_ERROR
}

export const apiError = (error) => {
  return {
    type: API_ERROR,
    error
  }
}
