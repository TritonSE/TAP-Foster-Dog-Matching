const { User } = require("../models");
const { createFirebaseUser } = require("./auth");
const { ServiceError } = require("./errors");

/**
 * Create an user
 * @param rawUser - details of user to create
 */
async function createUser(rawUser) {
  const existingUser = await User.findOne({ email: rawUser.email }).exec();
  if (existingUser) {
    throw ServiceError(400, "An account with this email already exists");
  }
  const newUserObj = {
    ...rawUser,
    currentlyFostering: false,
    lastActive: Date.now(),
    fosters: { past: [], current: [] },
    ambassador: null,
    coordinator: null,
    accountStatus: "active",
  };
  const newUser = await new User(newUserObj).save();
  await createFirebaseUser(newUser.id.toString(), rawUser.email, rawUser.password, "user");
  return newUser;
}

/**
 * Returns a specific user profile according to provided user id
 * @param userId - user's ID
 */
function getUser(userId) {
  return User.findById(userId).exec();
}

/**
 * Adds an application the user's applications list
 * @param userId - The user to add the application to
 * @param applicationId - The application to add to the user
 */
async function addApplication(userId, applicationId) {
  const user = await User.findById(userId).exec();
  const applications = user.applications === undefined ? [] : user.applications;

  applications.push(applicationId);
  console.log(applications);
  User.findByIdAndUpdate(userId, { applications }).exec();
}
/**
 * Update a user
 * @param userId - id of user to update
 * @param updatedUser - updated user properties
 */
async function updateUser(userId, updatedUserProperties) {
  const updatedUser = await User.findByIdAndUpdate(userId, updatedUserProperties, {
    new: true,
  }).exec();
  return updatedUser;
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  addApplication,
};
