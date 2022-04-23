const { User } = require("../models");

/**
 * Create an user
 * @param rawUser - details of interview to create
 */
async function createUser(rawUser) {
  const user = await new User(rawUser).save();
  return user;
}

/**
 * Check email and password
 * @param emailPass - email and pass to validate
 */
async function checkCredentials(emailPass) {
  const userObject = await User.findOne({ email: emailPass.email }).exec();
  if (userObject === null) {
    return false;
  }
  if (emailPass.password === userObject.password) {
    return true;
  }
  return false;
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
  checkCredentials,
  getUser,
};
