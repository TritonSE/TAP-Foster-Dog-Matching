const { firebaseAuth } = require("./firebase");

/**
 * Create a new Firebase Auth user
 *
 * @param {string} uid - uid to assign (ie. the Mongo ObjectID)
 * @param {string} email - email address (must be unique)
 * @param {string} password - password for user (must be at least 6 chars)
 * @param {'admin' | 'user'} type - which type of user? 'admin' or 'user'
 * @return {UserRecord} - Firebase Auth UserRecord (https://firebase.google.com/docs/reference/admin/node/firebase-admin.auth.userrecord.md#userrecord_class)
 */
async function createFirebaseUser(uid, email, password, type) {
  const userRecord = await firebaseAuth.createUser({
    uid,
    email,
    password,
  });
  await firebaseAuth.setCustomUserClaims(userRecord.uid, { type });
  return userRecord;
}
/**
 * Decode a Firebase Auth JWT Token
 *
 * @param {string} token - token provided by caller
 * @return {DecodedIdToken} - Firebase Auth DecodedIdToken (https://firebase.google.com/docs/reference/admin/node/firebase-admin.auth.decodedidtoken.md#decodedidtoken_interface)
 */
async function decodeAuthToken(token) {
  try {
    const userInfo = await firebaseAuth.verifyIdToken(token);
    return userInfo;
  } catch (e) {
    return null;
  }
}

module.exports = { createFirebaseUser, decodeAuthToken };
