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
import { Colors } from "./Theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  border-radius: 40px;
  border: 5px solid #91c649;
  padding: 5% 0;
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
  return (
    <Container>
      <Text>
        Applicant has been rejected. Their application can be reactivated with director’s approval.
      </Text>
      <Button onClick={() => navigate("/pending-applications")}>Dashboard</Button>
    </Container>
  );
}

export default ApplicationRejected;
