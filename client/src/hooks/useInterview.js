/**
 * useInterview Hook
 *
 * Hook to retrieve an interview by userId and stage and populate admin information
 *
 * Formats interview object to be passed to StatusUpdate component
 *
 * @param {string} userId - userId of interview to get
 * @param {string} interviewStage - stage of interview
 */

import React from "react";
import { getAdmin } from "../services/admins";
import { getInterview } from "../services/interviews";

const useInterview = (userId, stage) => {
  const [interview, setInterview] = React.useState();

  const refetchInterview = React.useCallback(() => {
    getInterview(userId, stage).then((response) => {
      if (response.ok) {
        const {
          data: { interview: fetchedInterview },
        } = response;
        if (fetchedInterview) {
          // Get admin details
          getAdmin(fetchedInterview.ambassador).then((getAdminResponse) => {
            const {
              data: {
                admin: { firstName, lastName, phone, email, photoURL },
              },
            } = getAdminResponse;
            setInterview({
              ...fetchedInterview,
              ambassador: `${firstName} ${lastName}`,
              phone,
              email,
              image: photoURL,
            });
          });
        }
      }
    });
  }, []);

  React.useEffect(refetchInterview, []);

  return { interview, refetchInterview };
};

export default useInterview;
