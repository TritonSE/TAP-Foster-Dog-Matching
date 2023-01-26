/**
 *
 * Application Data Context
 *
 * Provides application data to entire app
 * Can be used to cache application data (eg. cache fetching all admins so we don't have to fetch it every time)
 *
 * Value:
 *      - allAmbassadors (array) - all ambassadors user objects (only exists if user is an admin)
 *      - allCoordinators (array) - all coordinator user objects (only exists if user is an admin)
 *
 * Used in CoordinatorSelect.js and AmbassadorSelect.js
 */

import React from "react";
import { getAllAdmins } from "../services/admins";

import "../css/loadingBox.css";
import { AuthContext } from "./AuthContext";

export const DataContext = React.createContext({});

export function DataProvider({ children }) {
  const [allAdmin, setAllAdmin] = React.useState();
  const [allAmbassadors, setAllAmbassadors] = React.useState();
  const [allCoordinators, setAllCoordinators] = React.useState();
  const [allManagement, setAllManagement] = React.useState();
  const { currentUser } = React.useContext(AuthContext);

  const fetchData = React.useCallback(() => {
    // Fetch all admins
    if (currentUser && currentUser.type === "admin") {
      getAllAdmins().then(({ data: { admin } }) => {
        const ambassadors = admin.filter((a) => a.role === "ambassador");
        const coordinators = admin.filter((a) => a.role === "coordinator");
        const management = admin.filter((a) => a.role === "management");
        setAllAdmin(admin);
        setAllAmbassadors(ambassadors);
        setAllCoordinators(coordinators);
        setAllManagement(management);
      });
    }
    // Fetch other necessary data here...
  }, [currentUser]);

  React.useEffect(fetchData, [currentUser]);

  const value = React.useMemo(
    () => ({ allAdmin, allAmbassadors, allCoordinators, allManagement, refetchData: fetchData }),
    [allAdmin, allAmbassadors, allCoordinators, allManagement, fetchData]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
