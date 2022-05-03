import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DefaultBody from "../components/DefaultBody";
import DogCard from "../components/DogProfileCard";
import CreateDogPopUp from "../components/CreateDogPopUp";
import Arrow from "../images/arrow.png";
import Plus from "../images/plus.png";
import GreenButton from "../images/greenbutton.png";

import { device } from "../utils/useResponsive";

// styles for DogInfoBlock component
const DogInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;

  ${device.mobile} {
    width: 100%;
    margin-left: 0;
  }
`;

const HeaderInline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
`;

const Title = styled.h1`
  margin: 0;
  ${device.mobile} {
    font-size: 25px;
  }
`;

const BottomLine = styled.hr`
  height: 4px;
  border: none;
  background-color: black;
  margin-left: 0;
  margin-right: 0;
`;

const ViewAll = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 30%;
`;

const ViewAllButton = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 20px;
`;

const ViewAllButtonImg = styled.img`
  width: 20px;
`;

const DogConainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1385px;
  ${(props) => (props.hidden ? "max-height: 370px;" : "")}
  overflow: ${(props) => (props.hidden ? "hidden" : "visible")};
`;

// styles for CreateNewDogButton component
const CreateNewDogWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  width: 330px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  cursor: pointer;

  @media screen and (max-width: 1250px) {
    position: static;
    margin-bottom: 20px;
  }
`;

const AddOverlap = styled.div`
  width: 50px;
  height: 50px;

  position: relative;
`;

const GreenCircleImg = styled.img`
  width: 100%;
  position: absolute;
`;
const PlusImg = styled.img`
  width: 100%;
  position: absolute;
`;

const CreateDogButtonText = styled.p`
  margin: 0;
`;

function Dogs({ dogs, validator }) {
  return (
    <>
      {dogs.map((dog, i) => {
        if (validator === dog.category) {
          return <DogCard key={i} name={dog.name} imageRef={dog.imageUrl[0]} />;
        }
      })}
    </>
  );
}

function DogInfoBlock({ blockTitle, dogs, validator, loaded }) {
  const [hidden, setHidden] = useState(true);

  return (
    <DogInfoWrapper>
      <HeaderWrapper>
        <HeaderInline>
          <Title>{blockTitle}</Title>
          <ViewAll>
            <ViewAllButton onClick={() => setHidden(!hidden)}>
              {hidden ? "View All" : "View Less"}
            </ViewAllButton>
            <ViewAllButtonImg src={Arrow} />
          </ViewAll>
        </HeaderInline>
        <BottomLine />
      </HeaderWrapper>

      <DogConainer hidden={hidden}>
        {loaded && <Dogs dogs={dogs} validator={validator} />}
      </DogConainer>
    </DogInfoWrapper>
  );
}

function CreateNewDogButton({ onClick }) {
  return (
    <CreateNewDogWrapper onClick={onClick}>
      <AddOverlap>
        <GreenCircleImg src={GreenButton} />
        <PlusImg src={Plus} />
      </AddOverlap>
      <CreateDogButtonText>Create a New Dog Profile</CreateDogButtonText>
    </CreateNewDogWrapper>
  );
}

function DogProfile() {
  const [allDogs, setAllDogs] = useState();
  const [loaded, setLoaded] = useState(false);
  const [createNewPopUp, setCreateNewPopUp] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/dogs/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.dogs);
        setAllDogs(json.dogs);
        setLoaded(true);
        return json.dogs;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DefaultBody>
      <CreateNewDogButton onClick={() => setCreateNewPopUp(!createNewPopUp)} />
      {createNewPopUp && <CreateDogPopUp />}

      <DogInfoBlock blockTitle="New Dogs" loaded={loaded} dogs={allDogs} validator="new" />
      <DogInfoBlock blockTitle="Dogs In Home" loaded={loaded} dogs={allDogs} validator="in home" />
      <DogInfoBlock blockTitle="Adopted Dogs" loaded={loaded} dogs={allDogs} validator="adopted" />
    </DefaultBody>
  );
}

export default DogProfile;
