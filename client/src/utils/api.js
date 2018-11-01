import { camelizeKeys } from 'humps'
import { schema, normalize } from 'normalizr'

const baseUrl = "http://localhost:3000";

/**
 * Make a post request given parameters
 *
 * @param  {string} path          The URL we want to request
 * @param  {string} objectName    The root object for the rails model
 * @param  {object} object        The attributes for the post request's object
 * @param  {object} requestSchema The schema that corresponds to the resource that we're getting
 *
 * @return {object} response      The response from the server
 */
export function post(path, objectName, object, requestSchema) {
  const payload = {
    [objectName]: object
  }
  const serializedPayload = JSON.stringify(payload);

  const options = generateOptionsForPost(serializedPayload);
  const url = `${baseUrl}${path}`

  const response = request(url, requestSchema, options);
  return response;
}

/**
 * Generate options for a post request
 * @return {string} json        JSON for the object that we're posting
 * @return {object}             a header object
 */
export function generateOptionsForPost(json) {
  return {
    method: 'post',
    body: json,
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }
}
 
/**
 * Make a get request given parameters
 *
 * @param  {string} path          The URL we want to request
 * @param  {object} requestSchema The schema that corresponds to the resource that we're getting
 *
 * @return {object} response      The response from the server
 */
export function get(path, requestSchema) {
  // const options = generateOptionsForGet()
  const url = `${baseUrl}${path}`

  const response = request(url, requestSchema)
  return response
}

/**
 * Generate options for a get request
 *
 * @return {object} options
 */
export function generateOptionsForGet() {
  return {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "json" or "err"
 */
export function request(url, requestSchema, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(camelizeJson)
    .then(res => normalize(res, requestSchema))
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Camelizes the JSON keys
 *
 * @param  {object} json    JSON from the response
 *
 * @return {object} json    JSON w/ camelized keys
 */
function camelizeJson(json) {
  // console.log("json", json);
  return camelizeKeys(json)
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/** Schemas **/

export const educatorSchema = new schema.Entity('educators');
export const courseSchema = new schema.Entity('courses');

educatorSchema.define({
  courses: [courseSchema]
});

courseSchema.define({
  educator: [educatorSchema]
});
