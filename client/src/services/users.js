/**
 *
 * Users Service
 *
 * Provides functions for Users API
 *
 */

const { getData, sendData } = require("./data");

/**
 * Create a user
 *
 * @export
 * @param {object} newUser - new user data
 * @return {object} - newly created user (as a makeRequest response. see data.js)
 */
export async function createUser(newUser) {
  return sendData("users", "POST", newUser, false);
}

/**
 * Get a user
 *
 * @export
 * @param {string} userId - user id to get
 * @return {object} - user object (as a makeRequest response. see data.js)
 */
export async function getUser(userId) {
  return getData(`users/${userId}`);
}

/**
 * Returns all users
 * @returns {object} - Users (as a makeRequest response. see data.js)
 */
export async function getUsers() {
  return getData(`users`);
}
