/**
 * Dog Images Input Component
 *
 *  @summary     Dog Image Input Component
 *  @author      Parth Patel, Philip Zhang
 *
 * Component to upload/update dog profile image.
 *
 * props:
 *    dogId [string] - id of dog
 *    initialValue [optional][string] - initial image url to show
 */

import React, { useRef, useState } from "react";
import styled from "styled-components";
import Edit from "../images/pencil.png";
import dogDefault from "../images/dog-default.png";

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DogPic = styled.img`
  max-width: 225px;
  max-height: 225px;
  margin-bottom: 2vh;
`;

const EditWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const EditImg = styled.img`
  width: 31px;
  background: white;
`;

const EditText = styled.p`
  width: 31px;
  margin: 0;
  margin-left: 10px;
`;

function DogImageInput({ initialValue, onChange }) {
  const fileInputRef = useRef(null);
  const [imageUrl, setImageURL] = useState(initialValue);

  const openFileUploadDialog = () => {
    fileInputRef.current.click();
  };

  const onFileInputChange = (event) => {
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setImageURL(fileUrl);
    onChange(file);
  };

  return (
    <ImageWrapper>
      <DogPic src={imageUrl || dogDefault} />
      <EditWrapper onClick={openFileUploadDialog}>
        <EditImg src={Edit} />
        <EditText>{imageUrl ? "Edit" : "Add"}</EditText>
      </EditWrapper>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileInputChange}
        style={{ display: "none" }}
      />
    </ImageWrapper>
  );
}

export default DogImageInput;
