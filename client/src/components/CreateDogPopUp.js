import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Form from "./Form";
import { ControlledInput, InputLabel } from "./Input";
import { Colors } from "./Theme";
import { device } from "../utils/useResponsive";
import Select from "../components/Select";
import DogImagesInput from "./DogImagesInput";
import validUrl from "../utils/validUrl";
import X from "../images/X.png";

const CreateWrapper = styled.div`
  position: absolute;
  height: fit-content;

  width: 100%;
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
  width: 40%;
  display: flex;
  flex-direction: column;
  ${device.tablet} {
    width: 45%;
  }

  ${device.mobile} {
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
  const [gender, setGender] = useState("Male");
  const [category, setCategory] = useState("new");

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

  // handle form submission
  const { control, handleSubmit } = useForm({
    reValidateMode: "onChange",
  });

  const onSubmit = (data) => {
    // validate images
    const filtered = imageArr.filter((item) => item !== "");
    if (imageCounter !== filtered.length || !checkUrl(filtered)) {
      // no image(s) provided or invalid urls provided
      setError(true);
    } else {
      setError(false);
      // image(s) are provided

      // make post request to create a new dog
      const reqBody = {
        name: data.name,
        age: parseInt(data.age),
        gender: gender,
        weight: parseInt(data.weight),
        breed: data.breed,
        imageUrl: filtered,
        category: category,
        backgroundInfo: data.backgroundInfo,
        vettingInfo: data.vettingInfo,
        internalNotes: data.internalInfo,
      };

      fetch("http://localhost:8000/api/dogs", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const onError = (errors) => {
    // validate images
    const filtered = imageArr.filter((item) => item !== "");
    if (imageCounter !== filtered.length || !checkUrl(filtered)) {
      // no image(s) provided or invalid urls provided
      setError(true);
    }
    console.log(errors);
  };

  const checkUrl = (arr) => {
    // returns true if all items are valid urls, returns false otherwise
    for (const item of arr) {
      console.log(item);
      if (!validUrl(item)) {
        return false;
      }
    }
    return true;
  };

  return (
    <CreateWrapper>
      <Close src={X} onClick={() => props.setCreateNewPopUp(false)} />
      <Form.Container>
        <Title>New Dog Profile</Title>
        <FormWrapper>
          <LeftWrapper>
            <LeftTop>
              <Form.Column>
                <ControlledInput control={control} label="Name" name="name" required />
                <ControlledInput control={control} label="Age" name="age" type="number" required />
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
                name="internalInfo"
                required
              />
            </Form.Column>
          </RightWrapper>
        </FormWrapper>

        <Form.Actions>
          <Button onClick={handleSubmit(onSubmit, onError)}>Continue</Button>
        </Form.Actions>
      </Form.Container>
    </CreateWrapper>
  );
}

export default CreateDogPopUp;
