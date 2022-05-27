/**
 *
 * Auth Context
 *
 * Provides current user object to entire app
 *
 * Value:
 *      - loadingUser (boolean) - true if user is loading
 *      - currentUser (object) - current user/admin object
 *      - signedIn (boolean) - indicates whether user is signed in or not
 *
 * Used in App.js. See Header.js for example usage.
 */

import React from "react";
import { getAdmin } from "../services/admins";
import { getUser } from "../services/users";
import { auth } from "../utils/firebase-config";

export const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
  const [loadingUser, setLoadingUser] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setLoadingUser(true);
      if (firebaseUser) {
        const { claims } = await firebaseUser.getIdTokenResult();

        // Fetch user/admin object
        let userObject;
        if (claims.type === "admin") {
          userObject = (await getAdmin(firebaseUser.uid)).data.admin;
        } else {
          userObject = (await getUser(firebaseUser.uid)).data.user;
        }

        setCurrentUser({ type: claims.type, ...userObject });
      } else {
        setCurrentUser();
      }
      setLoadingUser(false);
    });
    return unsubscribe;
  }, []);

  const value = React.useMemo(
    () => ({ loadingUser, currentUser, signedIn: currentUser !== undefined }),
    [currentUser, loadingUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
