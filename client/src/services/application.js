/**
 *
 * Applications Service
 *
 * Provides functions for Applications API
 *
 */

const { getData, sendData } = require("./data");

/**
 * Create an Application
 *
 * @export
 * @param {object} newApplication - new application data
 * @return {object} - newly created application (as a makeRequest response. see data.js)
 */
export async function createApplication(newApplication) {
  return sendData("application", "POST", newApplication, false);
}

/**
 * Update an Application profile
 *
 * @export
 * @param {string} applicationId - Application id to update
 * @param {object} updatedApplication - updated Application data
 * @return {object} - updated Application (as a makeRequest response. see data.js)
 */
export async function updateApplication(applicationId, updatedApplication) {
  return sendData(`application/${applicationId}`, "PUT", updatedApplication);
}

/**
 * Get an Application profile
 *
 * @export
 * @param {string} applicationId - Application id to get
 * @return {object} - Application profile (as a makeRequest response. see data.js)
 */
export async function getApplication(applicationId) {
  return getData(`application/${applicationId}`);
}
