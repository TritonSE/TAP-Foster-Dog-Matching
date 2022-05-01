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
  
  const user = await new User(rawUser).save();
  await createFirebaseUser(user.id.toString(), rawUser.email, rawUser.password, "user");
  return user;
}

/**
 * Returns a specific user profile according to provided user id
 * @param userId - user's ID
 */
function getUser(userId) {
  return User.findById(userId).exec();
}

module.exports = {
  createUser,
  getUser,
};
