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

  if (emailPass.password === userObject.password) {
    return true;
  }
  return false;
}

module.exports = {
  createUser,
  checkCredentials,
};
