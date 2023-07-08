/**
 *
 * Data Service
 *
 * Provides helper functions for calling the API w/ Firebase Auth JWT token.
 *
 */

import { getJWTToken } from "./auth";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000/api";
/**
 * Make generic HTTP request to API (wraps fetch API)
 *
 * @export
 * @param {string} path - url path to send request to (format: `[BACKEND_URL]/[path]`)
 * @param {object} options - options to send with request (https://developer.mozilla.org/en-US/docs/Web/API/fetch#init)
 * @return {object} http response with status (http code), ok (boolean), and data (json response object)
 */
export async function makeRequest(path, options) {
  const response = await fetch(`${BACKEND_URL}/${path}`, options);
  const json = await response.json();
  return {
    status: response.status,
    ok: response.ok,
    data: json,
  };
}

/**
 * Make GET request to API
 *
 * @export
 * @param {string} path - url path to send request to (format: `[BACKEND_URL]/[path]`)
 * @param {boolean} [authenticated=true] - populate the Authorization header w/ token?
 * @return {object} http response with status (http code), ok (boolean), and data (json response object)
 */
export async function getData(path, authenticated = true) {
  const headers = {};
  if (authenticated) {
    headers.Authorization = `Bearer ${await getJWTToken()}`;
  }
  return makeRequest(path, {
    headers,
  });
}

export async function sendRawData(path, method, headers, body, authenticated = true) {
  if (authenticated) {
    headers.Authorization = `Bearer ${await getJWTToken()}`;
  }
  return makeRequest(path, {
    method,
    headers,
    body,
  });
}

/**
 * Make request to API w/ JSON body (ie. POST, PUT, DELETE)
 *
 * @export
 * @param {string} path - url path to send request to (format: `[BACKEND_URL]/[path]`)
 * @param {string} method - http method (ie. 'POST', 'PUT', 'DELETE')
 * @param {object} body - JSON body to send
 * @param {boolean} [authenticated=true] - populate the Authorization header w/ token?
 * @return {object} http response with status (http code), ok (boolean), and data (json response object)
 */
export async function sendData(path, method, body, authenticated = true) {
  const headers = {
    "Content-Type": "application/json",
  };
  return sendRawData(path, method, headers, JSON.stringify(body), authenticated);
}
