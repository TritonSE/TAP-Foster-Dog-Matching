const { Admin } = require("../models");

/**
 * Returns an array of all admins
 */
function getAdmins() {
  return Admin.find().exec();
}

/**
 * Returns a specific admin profile according to provided admin id
 * @param adminId - admin's ID
 */
function getAdmin(adminId) {
  return Admin.findById(adminId).exec();
}

/**
 * Create an admin profile
 * @param newAdmin - new Admin information
 */
async function createAdmin(newAdmin) {
  const admin = await new Admin(newAdmin).save();
  return admin;
}

/**
 * Update an admin
 * @param adminId - admin's ID
 * @param updatedAdmin - updated admins profile
 */
async function updateAdmin(adminId, updatedAdmin) {
  const newAdmin = await Admin.findByIdAndUpdate(adminId, updatedAdmin, {
    new: true,
  }).exec();
  return newAdmin;
}

/**
 * Validates email and password
 * @param credentials - email and pass to validate
 */
async function validateCredenditals(credentials) {
  const admin = await Admin.findOne({ email: credentials.email }).exec();

  if (admin.password === credentials.password) {
    return true;
  }

  return false;
}

module.exports = {
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  validateCredenditals,
};
