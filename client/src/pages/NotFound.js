import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import DefaultBody from "../components/DefaultBody";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 30px;
  gap: 20px;
`;

function NotFound() {
  const navigate = useNavigate();
  return (
    <DefaultBody>
      <Container>
        There&apos;s nothing here :(
        <Button
          name="Take me back"
          styleBorder={{ width: "fit-content", padding: "0 20px" }}
          onClick={() => navigate("/")}
        />
      </Container>
    </DefaultBody>
  );
}

export default NotFound;
