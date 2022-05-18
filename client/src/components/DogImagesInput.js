/**
 * Dog Images Input Component
 * 
 *  @summary     Dog Images Input Component
 *  @author      Parth Patel
 * 
 * Component to add links of up to 3 dogs and delete links according to the figma model. 
 * Used in the CreateDogPopUp component as a part of the form to create a new dog/ update an existing dog's information
 * 
 * props:
 *    initialVals [optional][ array] - array of links to prepopulate the component with
 *    error[ boolean] - whether or not there is an error within the user input links formatting
 *                     used to determine whether to show red around input boxes
 *    setImageArr [function] - callback used to send image array to parent component
 *    setImageCounter [function] - callback used to send image count to parent component
 * 
 */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Trash from "../images/trash.png";
import Add from "../images/add.png";
import { device } from "../utils/useResponsive";
import validUrl from "../utils/validUrl";

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Title = styled.h3``;

const InputLineWrapper = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 80%;
  height: 33px;
  border: ${(props) => (props.error ? "2px solid red" : "2px solid #9B9A9A")};
  border-radius: 8px;
  font-size: 18px;
  padding: 4px;
  box-sizing: border-box;

  ${device.mobile} {
    font-size: 3vw;
  }
`;

const DeleteImage = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const AddWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  align-items: center;
`;

const Plus = styled.img`
  height: 25px;
  width: 25px;
  cursor: pointer;
`;

const Text = styled.p`
  margin: 0;
`;

function DogImagesInput(props) {
  const [images, setImages] = useState(props.initialVals ? props.initialVals : ["", "", ""]);
  const [imageCount, setImageCount] = useState(
    props.initialVals ? Math.max(props.initialVals.length, 1) : 1
  );

  const addImg = (val, index) => {
    const placeHolder = [...images];
    placeHolder[index] = val;
    setImages(placeHolder);
  };

  const delImg = (index) => {
    if (imageCount > 1) {
      const placeHolder = [...images];
      placeHolder.splice(index, 1);
      setImages(placeHolder);
      setImageCount(imageCount - 1);
    }
  };

  const checkError = (errorState, index) => {
    if (errorState) {
      // make the color of the input box red
      // if the input is blank or is not a valid URL
      if (images[index] === "" || !validUrl(images[index])) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    // send image array to parent component
    props.setImageArr(images);
    props.setImageCounter(imageCount);
  }, [images, imageCount]);

  return (
    <ImageWrapper>
      <Title>Images</Title>

      <InputLineWrapper show={imageCount >= 1}>
        <Input
          value={images[0] || ""}
          onChange={(e) => addImg(e.target.value, 0)}
          error={checkError(props.error, 0)}
        />
        <DeleteImage src={Trash} onClick={() => delImg(0)} />
      </InputLineWrapper>

      <InputLineWrapper error={checkError(props.error, 1)} show={imageCount >= 2}>
        <Input
          value={images[1] || ""}
          onChange={(e) => addImg(e.target.value, 1)}
          error={checkError(props.error, 1)}
        />
        <DeleteImage src={Trash} onClick={() => delImg(1)} />
      </InputLineWrapper>

      <InputLineWrapper error={checkError(props.error, 2)} show={imageCount >= 3}>
        <Input
          value={images[2] || ""}
          onChange={(e) => addImg(e.target.value, 2)}
          error={checkError(props.error, 2)}
        />
        <DeleteImage src={Trash} onClick={() => delImg(2)} />
      </InputLineWrapper>

      <AddWrapper>
        <Plus
          src={Add}
          onClick={() => {
            if (imageCount < 3) {
              setImageCount(imageCount + 1);
            }
          }}
        />
        <Text>Add up to 3 images</Text>
      </AddWrapper>
    </ImageWrapper>
  );
}

export default DogImagesInput;
