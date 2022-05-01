/* eslint-disable import/no-unresolved */
const firebase = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

// Initialize Firebase Admin
firebase.initializeApp({
  credential: firebase.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS_JSON)),
});

module.exports = { firebaseAuth: getAuth() };
