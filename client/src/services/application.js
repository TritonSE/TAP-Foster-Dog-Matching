/**
 *
 * Applications Service
 *
 * Provides functions for Applications API
 *
 */

const { getData, sendData } = require("./data");

// TODO implement createApplication

/**
 * Get a application
 *
 * @export
 * @param {string} applicationId - application id to get
 * @return {object} - application object (as a makeRequest response. see data.js)
 */
export async function getApplication(applicationId) {
  return getData(`application/${applicationId}`);
}
