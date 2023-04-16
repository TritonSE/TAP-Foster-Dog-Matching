/**
 *
 * Interviews Service
 *
 * Provides functions for Interviews API
 *
 */

const { getData, sendData } = require("./data");

/**
 * Get an interview
 *
 * @export
 * @param {string} userId - userId of interview to get
 * @param {string} interviewStage - stage of interview
 * @return {object} - interview object (as a makeRequest response. see data.js)
 */
export async function getInterview(userId, interviewStage) {
  return getData(`interviews/${userId}?stage=${interviewStage}`);
}

/**
 * Get interviews by date
 *
 * @export
 * @param {string} - date of interviews to get
 * @return {object} - interview objects (as a makeRequest response. see data.js)
 */
export async function getInterviews(interviewDate) {
  return getData(`interviews/?date=${interviewDate}`);
}

/**
 * Create a interview
 *
 * @export
 * @param {object} newInterview - new interview data
 * @return {object} - newly created interview (as a makeRequest response. see data.js)
 */
export async function createInterview(newInterview) {
  return sendData("interviews", "POST", newInterview);
}

/**
 * Update an Interview
 *
 * @export
 * @param {string} interviewId - Interview id to update
 * @param {object} updatedInterview - updated Interview data
 * @return {object} - updated Interview (as a makeRequest response. see data.js)
 */
export async function updateInterview(interviewId, updatedInterview) {
  return sendData(`interviews/${interviewId}`, "PUT", updatedInterview);
}
