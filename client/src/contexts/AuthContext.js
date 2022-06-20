/**
 *
 * Auth Context
 *
 * Provides current user object to entire app
 *
 * Value:
 *      - currentUser (object) - current user/admin object
 *      - signedIn (boolean) - indicates whether user is signed in or not
 *
 * Used in App.js. See Header.js for example usage.
 */

import React from "react";
import styled from "styled-components";
import { getAdmin } from "../services/admins";
import { getUser } from "../services/users";
import { auth } from "../utils/firebase-config";
import loadingCircle from "../images/loadingcircle.png";
import "../css/loadingBox.css";

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  & > img {
    width: 10vh;
  }
`;

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
    () => ({ currentUser, signedIn: currentUser !== undefined }),
    [currentUser]
  );

  if (loadingUser)
    return (
      <LoadingContainer>
        <img src={loadingCircle} className="loading-image" alt="loading circle" />
      </LoadingContainer>
    );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
