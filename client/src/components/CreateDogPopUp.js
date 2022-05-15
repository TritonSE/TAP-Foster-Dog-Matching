import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Form from "./Form";
import { ControlledInput, InputLabel } from "./Input";
import { Colors } from "./Theme";
import { device } from "../utils/useResponsive";


const CreateWrapper = styled.div`
  position: absolute;
  height: calc(100vh - 230px);
  width: 100%;
  z-index: 3;
  background: #FFFFFF;
border-radius: 20px;
border: 1px solid black;

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
  align-self: ${(props) => props.alignSelf || "unset"};
`;

function CreateDogPopUp({ onClick }) {
  const { control, watch, handleSubmit } = useForm({
    reValidateMode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <CreateWrapper>

      <Form.Container>
        <Form.Title>New Dog Profile</Form.Title>
        <Form.Row>
          
            <Form.Row>
            <Form.Column>
              <ControlledInput control={control} label="Name" name="name" required />
              <ControlledInput control={control} label="Age" name="age" required />
              <ControlledInput control={control} label="Gender" name="gender" required />
              <ControlledInput control={control} label="Weight" name="weight" required />
              <ControlledInput control={control} label="Breed" name="breed" required />
            </Form.Column>
            </Form.Row>
          
          <Form.Column>
            <Form.Row width="100%">
              <ControlledInput
                control={control}
                label="Background Info"
                numLines={6}
                name="backgroundInfo"
                required
              />
            </Form.Row>
            <Form.Row>
              <ControlledInput
                control={control}
                label="Vetting Info"
                numLines={6}
                name="vettingInfo"
                required
              />
            </Form.Row>
            <Form.Row>
              <ControlledInput
                control={control}
                label="Internal Info"
                numLines={6}
                name="internalInfo"
                required
              />
            </Form.Row>
          </Form.Column>
        </Form.Row>

        <Form.Actions>
          <div /> {/* Spacer */}
          <Button onClick={handleSubmit(onSubmit, onError)}>Continue</Button>
        </Form.Actions>
      </Form.Container>
    </CreateWrapper>
  );
}

export default CreateDogPopUp;
