/**
 *
 * Contact Service
 *
 * Provides functions for Contact API
 *
 */

const { sendData } = require("./data");

/**
 * Send a contact email
 *
 * @export
 * @param {string} name - name of person
 * @param {string} email - from email
 * @param {string} team - team to contact
 * @param {string} message - message text
 * @return {object} - contact api response (as a makeRequest response. see data.js)
 */
export async function sendContact(name, email, team, message) {
  return sendData("contact", "POST", {
    name,
    email,
    team,
    message,
    toEmail: "tapmatching@gmail.com",
  });
}
