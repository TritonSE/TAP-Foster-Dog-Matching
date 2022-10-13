const { Admin } = require("../models");
const { createFirebaseUser } = require("./auth");
const { ServiceError } = require("./errors");

const ADMIN_ROLES = {
  MANAGEMENT: "management",
  AMBASSADOR: "ambassador",
  COORDINATOR: "coordinator",
};

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
 * @param validateOnly - if true, only perform validation and don't create the admin.
 */
async function createAdmin(newAdmin, validateOnly) {
  const existingAdmin = await Admin.findOne({ email: newAdmin.email }).exec();
  if (existingAdmin) {
    throw ServiceError(400, "An account with this email already exists");
  }

  if (validateOnly) return null;

  const admin = await new Admin(newAdmin).save();
  await createFirebaseUser(admin.id.toString(), newAdmin.email, newAdmin.password, "admin");
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

module.exports = {
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  ADMIN_ROLES,
};
