/**
 * Application Reject Component
 *
 * Component that signifies to admin that applicant has been rejected
 *
 * Used on: Application
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ApplicationContext from "../contexts/ApplicationContext";
import { AuthContext } from "../contexts/AuthContext";
import { Colors } from "./Theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  border-radius: 40px;
  border: 5px solid #91c649;
  padding: 5%;
  margin: 1em;
`;

const Text = styled.div`
  font-size: 24px;
  text-align: center;
  width: 60%;
`;

const Button = styled.div`
  background: ${Colors.green};
  font-size: 20px;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  width: fit-content;
  color: white;
  cursor: pointer;
`;

function ApplicationRejected() {
  const navigate = useNavigate();
  const {
    applicationState: {
      messages: {
        stage1: stage1RejectionMessage,
        stage2: stage2RejectionMessage,
        stage3: stage3RejectionMessage,
        stage4: stage4RejectionMessage,
      },
    },
  } = React.useContext(ApplicationContext);
  const { currentUser } = React.useContext(AuthContext);

  return (
    <Container>
      {currentUser.type === "admin" ? (
        <Text>
          Applicant has been rejected. Their application can be reactivated with director&apos;s
          approval.
        </Text>
      ) : (
        <div className="message-from-admin">
          {(
            stage4RejectionMessage ||
            stage3RejectionMessage ||
            stage2RejectionMessage ||
            stage1RejectionMessage
          ).replace(/\n/g, "\n\n")}
        </div>
      )}
      <Button
        onClick={() =>
          navigate(currentUser.type === "admin" ? "/pending-applications" : "/dashboard")
        }
      >
        Dashboard
      </Button>
    </Container>
  );
}

export default ApplicationRejected;
