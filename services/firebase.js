/* eslint-disable import/no-unresolved */
const firebase = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getStorage } = require("firebase-admin/storage");

// Initialize Firebase Admin
firebase.initializeApp({
  credential: firebase.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS_JSON)),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

module.exports = { firebaseAuth: getAuth(), firebaseStorage: getStorage() };
