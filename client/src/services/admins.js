/**
 *
 * Admins Service
 *
 * Provides functions for Admins API
 *
 */

const { getData, sendData } = require("./data");

/**
 * Create an admin
 *
 * @export
 * @param {object} newAdmin - new admin data
 * @return {object} - newly created admin (as a makeRequest response. see data.js)
 */
export async function createAdmin(newAdmin) {
  return sendData("admins", "POST", newAdmin, false);
}

/**
 * Update an admin profile
 *
 * @export
 * @param {string} adminId - admin id to update
 * @param {*} updatedAdmin - updated admin data
 * @return {object} - updated admin (as a makeRequest response. see data.js)
 */
export async function updateAdmin(adminId, updatedAdmin) {
  return sendData(`admins/${adminId}`, "PUT", updatedAdmin);
}

/**
 * Get an admin profile
 *
 * @export
 * @param {string} adminId - admin id to get
 * @return {object} - admin profile (as a makeRequest response. see data.js)
 */
export async function getAdmin(adminId) {
  return getData(`admins/${adminId}`);
}

/**
 * Get all admin profiles
 *
 * @export
 * @return {object} - all admin profiles (as a makeRequest response. see data.js)
 */
export async function getAllAdmins() {
  return getData("admins");
}
