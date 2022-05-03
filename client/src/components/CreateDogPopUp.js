import React from "react";
import styled from "styled-components";

const CreateWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: black;
`;

function CreateDogPopUp({ onClick }) {
  return <CreateWrapper>Hello there</CreateWrapper>;
}

export default CreateDogPopUp;
