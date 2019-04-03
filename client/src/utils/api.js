import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { schema, normalize } from 'normalizr';

const baseUrl = "http://localhost:3001";

/**
 * Make a post request given parameters
 *
 * @param  {string} path          The URL we want to request
 * @param  {string} objectName    The root object for the rails model
 * @param  {object} object        The attributes for the post request's object
 * @param  {object} requestSchema The schema that corresponds to the resource that we're getting
 * @param  {string} token         The currentUser's auth token
 *
 * @return {object} response      The response from the server
 */
export function post(path, objectName, object, requestSchema, token = null) {
  const decamelizedObj = decamelizeKeys(object);
  const payload = {
    [objectName]: decamelizedObj
  }

  let options;
  if (!!token) {
    options = generateOptionsForPostWithToken(payload, token);
  } else {
    options = generateOptionsForPost(payload);
  }

  const url = `${baseUrl}${path}`;
  const response = request(url, requestSchema, options);

  return response;
}

/**
 * Generate options for a post request
 * @param {string} json        JSON for the object that we're posting
 * @param {string} token       The currentUser's auth token
 * @return {object}            a header object
 */
export function generateOptionsForPostWithToken(json, token) {
  return {
    method: 'post',
    data: json,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${token}`
    }
  }
}

/**
 * Generate options for a post request
 * @param {string} json        JSON for the object that we're posting
 * @return {object}             a header object
 */
export function generateOptionsForPost(json) {
  return {
    method: 'post',
    data: json,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
}

/**
 * Make a delete request given parameters
 *
 * @param  {string} path          The URL we want to request
 * @param {string} token          The currentUser's auth token
 *
 * @return {object} response      The response from the server
 */
export function destroy(path, token) {
  const options = generateOptionsForDelete(token);
  const url = `${baseUrl}${path}`
  return axios({url, ...options})
    .then(res => res)
    .catch(handleError);
}

/**
 * Generate options for a delete request
 * @param {string} token       The currentUser's auth token
 * @return {object}            a header object
 */
export function generateOptionsForDelete(token) {
  return {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${token}`
    }
  }
}
 
/**
 * Make a get request given parameters
 *
 * @param  {string} path          The URL we want to request
 * @param  {Schema} requestSchema The schema that corresponds to the resource that we're getting
 *
 * @return {object} response      The response from the server
 */
export function get(path, requestSchema) {
  const url = `${baseUrl}${path}`

  const options = generateOptionsForGet();
  const response = request(url, requestSchema, options);
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
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url           The URL we want to request
 * @param  {object} requestSchema The schema that the response will use
 * @param  {object} [options]     The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "json" or "err"
 */
export function request(url, requestSchema, options) {
  return axios({ url, ...options})
    .then(extractData)
    .then(camelizeJson)
    .then(res => normalizeResponse(res, requestSchema))
    .catch(handleError);
}

/**
 * Normalize the response with the correct schema
 * 
 * @param {object} response      The current processed response
 * @param {Schema} requestSchema The schema passed in with the request
 * @return {object}              The normalized response
 */
function normalizeResponse(response, requestSchema) {
  // console.log("response", response);
  const schema = setSchema(response, requestSchema);
  // console.log("schema", schema);
  const normalized = normalize(response, schema);
  return normalized;
}

/**
 * Determine the correct schema to normalize the response with
 * 
 * @param {object} response      The processed request response
 * @param {Schema} requestSchema The schema passed into the request function
 * @return {Schema}              The schema that should be used to normalize the request  
 */
function setSchema(response, requestSchema) {
  let schema = requestSchema;
  if (requestSchema === userSchema) {
    if (response.type === "Student") {
      schema = studentSchema;
    } else if (response.type === "Educator") {
      schema = educatorSchema;
    }
  }
  return schema;
}

/**
 * Throw when there's an error
 *
 * @param  {string} error     An error from the server
 */
function handleError(error) {
  const err = new Error(error);
  throw err.message;
}

/**
 * Extract the data from the response
 * 
 * @param {object} response The raw api response
 * @return {object}         The response data
 */
function extractData(response) {
  return response.data;
}

/**
 * Camelizes the JSON keys
 *
 * @param  {object} json    JSON from the response
 *
 * @return {object} json    JSON w/ camelized keys
 */
function camelizeJson(json) {
  return camelizeKeys(json)
}

/** Schemas **/

export const userSchema = new schema.Entity('users');
export const educatorSchema = new schema.Entity('educators');
export const studentSchema = new schema.Entity('students');
export const courseSchema = new schema.Entity('courses');
export const courseStudentRelationshipsSchema = new schema.Entity('courseStudentRelationships');
export const educatorStudentRelationshipsSchema = new schema.Entity('educatorStudentRelationships');

educatorSchema.define({
  courses: [courseSchema],
  educatorStudentRelationships: [educatorStudentRelationshipsSchema]
});

courseSchema.define({
  educator: educatorSchema,
  courseStudentRelationships: [courseStudentRelationshipsSchema]
});
