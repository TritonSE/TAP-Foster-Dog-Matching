/**
 * Create and Update Dog Pop Up component
 *
 * This component is used in the manage dog profiles page to create a new dog and edit the details of existing dogs
 *
 * props:
 *
 *    update [boolean] [optional] - if true, component is set to update state
 *    dog [object] - if update is true, a dog object with existing information must be provided
 *
 */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Form from "./Form";
import { ControlledInput } from "./Input";
import { Colors } from "./Theme";
import { device } from "../utils/useResponsive";
import Select from "./Select";
import DogImagesInput from "./DogImagesInput";
import validUrl from "../utils/validUrl";
import X from "../images/X.png";

const BlurBackground = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% + 50px);
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreateWrapper = styled.div`
  position: relative;
  height: fit-content;
  max-width: 1060px;
  width: calc(100% - 4px);

  z-index: 3;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid black;
`;

const Close = styled.img`
  position: absolute;
  left: 20px;
  top: 20px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  color: #8dc442;
  margin-top: 0;
  ${device.mobile} {
    font-size: 5vw;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2vw;
`;

const LeftWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  ${device.tablet} {
    width: 55%;
  }
`;

const LeftTop = styled.div`
  width: 65%;

  ${device.tablet} {
    width: 80%;
  }
`;

const LeftBottom = styled.div`
  width: 100%;
  justify-self: end;
`;

const RightWrapper = styled.div`
  width: 40%;
`;

const Button = styled.div`
  background: ${Colors.green};
  font-size: 20px;
  padding: 10px 30px;
  border-radius: 14px;
  width: fit-content;
  color: white;
  cursor: pointer;
  position: relative;
  left: 100%;
  transform: translateX(-100%);
  ${device.tablet} {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Text = styled.p`
  font-weight: normal;
  font-size: 18px;
  margin: 0;
  ${device.mobile} {
    font-size: 3vw;
  }
`;

function CreateDogPopUp(props) {
  // dropdowns and state management
  const [imageArr, setImageArr] = useState([]);
  const [imageCounter, setImageCounter] = useState(1);
  const [error, setError] = useState(false);
  const [gender, setGender] = useState(props.update ? props.dog.gender : "Male");
  const [category, setCategory] = useState(props.update ? props.dog.category : "New");
  // determine whether we are in update mode
  const update = props.update;

  const toSelectGender = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const toSelectCategory = [
    { label: "New", value: "new" },
    { label: "In Home", value: "in home" },
    { label: "Adopted", value: "adopted" },
  ];

  const handleSelectGender = React.useCallback((val) => {
    setGender(val);
  }, []);

  const handleSelectCategory = React.useCallback((val) => {
    setCategory(val);
  }, []);

  // initialize form
  const initialVals = () => {
    if (update) {
      return {
        name: props.dog.name,
        age: props.dog.age,
        weight: props.dog.weight,
        breed: props.dog.breed,
        backgroundInfo: props.dog.backgroundInfo,
        vettingInfo: props.dog.vettingInfo,
        internalNotes: props.dog.internalNotes,
      };
    }
    return {};
  };

  const { control, handleSubmit } = useForm({
    reValidateMode: "onChange",
    defaultValues: initialVals(),
  });

  // array of urls validator
  // returns true if all items are valid urls, returns false otherwise
  const checkUrl = (arr) => arr.reduce((aggregate, item) => aggregate && validUrl(item), true);

  // functions for creating a new dog
  const onSubmitCreate = (data) => {
    // validate images
    const filtered = imageArr.filter((item) => item !== "");
    if (imageCounter !== filtered.length || !checkUrl(filtered)) {
      // no image(s) provided or invalid urls provided
      setError(true);
    } else {
      // image(s) are provided
      setError(false);

      // make post request to create a new dog
      const reqBody = {
        name: data.name,
        age: parseInt(data.age, 10),
        gender,
        weight: parseInt(data.weight, 10),
        breed: data.breed,
        imageUrl: filtered,
        category,
        backgroundInfo: data.backgroundInfo,
        vettingInfo: data.vettingInfo,
        internalNotes: data.internalNotes ? data.internalNotes : "",
      };

      fetch("http://localhost:8000/api/dogs", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }).then(() =>
        // success - close the pop up
        props.setCreateNewPopUp(false)
      );
    }
  };

  const onErrorCreate = () => {
    // validate images
    const filtered = imageArr.filter((item) => item !== "");
    if (imageCounter !== filtered.length || !checkUrl(filtered)) {
      // no image(s) provided or invalid urls provided
      setError(true);
    }
  };

  // functions for updating a dog
  const onSubmitUpdate = (data) => {
    // validate images
    const filtered = imageArr.filter((item) => item !== "");
    if (imageCounter !== filtered.length || !checkUrl(filtered)) {
      // no image(s) provided or invalid urls provided
      setError(true);
    } else {
      // image(s) are provided
      setError(false);

      // make post request to update an existing dog
      const reqBody = {
        name: data.name,
        age: parseInt(data.age, 10),
        gender,
        weight: parseInt(data.weight, 10),
        breed: data.breed,
        imageUrl: filtered,
        category,
        backgroundInfo: data.backgroundInfo,
        vettingInfo: data.vettingInfo,
        internalNotes: data.internalNotes ? data.internalNotes : "",
      };

      fetch(`http://localhost:8000/api/dogs/${props.dog._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(reqBody),
      }).then(() =>
        // success - close the pop up
        props.setEditDogPopUp(false)
      );
    }
  };

  const onErrorUpdate = () => {
    // validate images
    const filtered = imageArr.filter((item) => item !== "");
    if (imageCounter !== filtered.length || !checkUrl(filtered)) {
      // no image(s) provided or invalid urls provided
      setError(true);
    }
  };

  return (
    <BlurBackground>
      <CreateWrapper>
        <Close
          src={X}
          onClick={
            update ? () => props.setEditDogPopUp(false) : () => props.setCreateNewPopUp(false)
          }
        />
        <Form.Container>
          <Title>{update ? "Update Dog Profile" : "New Dog Profile"}</Title>
          <FormWrapper>
            <LeftWrapper>
              <LeftTop>
                <Form.Column>
                  <ControlledInput control={control} label="Name" name="name" required />
                  <ControlledInput
                    control={control}
                    label="Age"
                    name="age"
                    type="number"
                    required
                  />
                  <Text>Gender</Text>
                  <Select
                    value={gender}
                    options={toSelectGender}
                    onChange={handleSelectGender}
                    height="19px"
                  />
                  <ControlledInput
                    control={control}
                    label="Weight"
                    name="weight"
                    type="number"
                    required
                  />
                  <ControlledInput control={control} label="Breed" name="breed" required />
                  <Text>Category</Text>
                  <Select
                    value={category}
                    options={toSelectCategory}
                    onChange={handleSelectCategory}
                    height="19px"
                  />
                </Form.Column>
              </LeftTop>
              <LeftBottom>
                <DogImagesInput
                  initialVals={update ? props.dog.imageUrl : undefined}
                  setImageArr={setImageArr}
                  error={error}
                  setError={setError}
                  setImageCounter={setImageCounter}
                />
              </LeftBottom>
            </LeftWrapper>

            <RightWrapper>
              <Form.Column>
                <ControlledInput
                  control={control}
                  label="Background Info"
                  numLines={6}
                  name="backgroundInfo"
                  width="100%"
                  required
                />

                <ControlledInput
                  control={control}
                  label="Vetting Info"
                  numLines={6}
                  name="vettingInfo"
                  required
                />

                <ControlledInput
                  control={control}
                  label="Internal Info"
                  numLines={6}
                  name="internalNotes"
                />
              </Form.Column>
            </RightWrapper>
          </FormWrapper>

          <Form.Actions>
            <Button
              onClick={
                update
                  ? handleSubmit(onSubmitUpdate, onErrorUpdate)
                  : handleSubmit(onSubmitCreate, onErrorCreate)
              }
            >
              {update ? "Update" : "Continue"}
            </Button>
          </Form.Actions>
        </Form.Container>
      </CreateWrapper>
    </BlurBackground>
  );
}

export default CreateDogPopUp;
