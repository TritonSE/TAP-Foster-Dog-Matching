/**
 *
 * Auth Service
 *
 * Provides authentication functions
 *
 * For creating an admin/user, see users.js and admins.js services
 */

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import FIREBASE_AUTH_ERROR_MESSAGES from "../constants/FIREBASE_AUTH_ERROR_MESSAGES";
import { auth } from "../utils/firebase-config";
import { sendData } from "./data";

/**
 * Sign a user in
 *
 * @export
 * @param {string} email - email address
 * @param {string} password - password
 * @return {UserCredential} - Firebase UserCredential (https://firebase.google.com/docs/reference/js/auth.usercredential.md#usercredential_interface)
 */
export async function signInUser(email, password) {
  const userCredential = signInWithEmailAndPassword(auth, email, password);
  return userCredential;
}

/**
 * Sign a user out
 *
 * @export
 */
export async function signOutUser() {
  signOut(auth);
}

/**
 * Get current user's auth token
 *
 * @export
 * @return {string} - current user's Firebase Auth token
 */
export async function getJWTToken() {
  return auth.currentUser.getIdToken();
}

export function getAuthErrorMessage(errorCode) {
  return FIREBASE_AUTH_ERROR_MESSAGES[errorCode] || "Something went wrong :(";
}
