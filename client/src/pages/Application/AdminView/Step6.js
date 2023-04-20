/**
 * Application (Admin View) Step 6
 */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StatusUpdate from "../../../components/StatusUpdate";
import Meetings from "../../../components/Meeting";
import DogProfileSummary from "../../../components/DogProfileSummary";
import { getDog } from "../../../services/dogs";
import ApplicationContext from "../../../contexts/ApplicationContext";
import FosterProfile from "../../../components/FosterProfile";
import { getAdmin } from "../../../services/admins";
import { getUser } from "../../../services/users";

const InternalNotes = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 15px;
  padding-top: 2vw;
  padding-bottom: 1vw;
  box-sizing: border-box;
  padding: 15px;
  text-align: left;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  gap: 20px;
`;

function FosterAndDogInformation() {
  const { applicationState } = React.useContext(ApplicationContext);
  const [fosterName, setFosterName] = useState("Foster name");
  const [ambassadorName, setAmbassadorName] = useState("Ambassador name");
  const [ambassadorPhone, setAmbassadorPhone] = useState("Ambassador phone");
  const [ambassadorEmail, setAmbassadorEmail] = useState("Ambassador email");
  const [coordinatorName, setCoordinatorName] = useState("Coordinator name");
  const [internalNotes, setInternalNotes] = useState("");
  const [fosterHistory, setFosterHistory] = useState([]);
  const [dogInternalNotes, setDogInternalNotes] = useState("");

  const [dog, setDog] = useState();

  useEffect(() => {
    getDog(applicationState?.finalDog).then((res) => setDog(res.data.dog));
    setFosterName(applicationState.firstName + " " + applicationState.lastName);
    getAdmin(applicationState.ambassador).then((data) => {
      const adminObj = data.data.admin;
      setAmbassadorName(adminObj.firstName + " " + adminObj.lastName);
      setAmbassadorPhone(adminObj.phone);
      setAmbassadorEmail(adminObj.email);
    });
    getAdmin(applicationState.coordinator).then((data) =>
      setCoordinatorName(data.data.admin.firstName + " " + data.data.admin.lastName)
    );
    getUser(applicationState.user).then((data) => {
      if (data.ok && data.data.user.internalNotes != null)
        setInternalNotes(data.data.user.internalNotes);
    });
  }, []);

  useEffect(() => {
    if (dog != null && dog.internalNotes != null) {
      setDogInternalNotes(dog.internalNotes);
    }
  }, [dog]);

  return (
    <Column>
      <FosterProfile
        name={fosterName}
        email={applicationState.email}
        ambassadorName={ambassadorName}
        coordinatorName={coordinatorName}
        fosterHistory={fosterHistory}
        internalNotes={internalNotes}
      />
      <Meetings
        title="Dog Profile"
        textCard={<DogProfileSummary dog={{ ...dog }} />}
        status={
          <Column>
            <StatusUpdate
              title="Ambassador Contact Info"
              ambassador={ambassadorName}
              phone={ambassadorPhone}
              email={ambassadorEmail}
            />
            <InternalNotes>Internal Notes: {dogInternalNotes}</InternalNotes>
          </Column>
        }
      />
    </Column>
  );
}

export default {
  content: <FosterAndDogInformation />,
};
