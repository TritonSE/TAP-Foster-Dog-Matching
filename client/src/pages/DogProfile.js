/**
 *  @summary     Manage Dog Profiles Page
 *  @author      Parth Patel
 *
 * Displays the dogs from the backend, allows you to create new dogs and edit existing dogs.
 *
 */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DefaultBody from "../components/DefaultBody";
import DogCard from "../components/DogProfileCard";
import CreateDogPopUp from "../components/CreateDogPopUp";
import Arrow from "../images/arrow.png";
import Doggo from "../images/good-boi-2.png";
import DogProfilePopUp from "../components/DogProfilePopUp";
import CreateNew from "../images/createNewDog.png";

import { device } from "../utils/useResponsive";
import { getDogs } from "../services/dogs";

// styles for whole page
const AllContentWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const AllDogsWrapper = styled.div`
  position: absolute;
  height: calc(100vh - 200px);
  overflow: ${(props) => (props.popUp ? "hidden" : "visible")};
`;

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
  position: relative;
  left: 100%;
  transform: translate(-100%);
  width: 330px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  cursor: pointer;
  margin-bottom: -50px;

  @media screen and (max-width: 1250px) {
    position: static;
    transform: translate(0);
    left: 0;
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

const CreateDogButtonText = styled.p`
  margin: 0;
`;

const ClickableDogCard = styled.div``;

function DogInfoBlock({ blockTitle, dogs, validator, loaded, setDogPopUp, setCurDog }) {
  const [hidden, setHidden] = useState(true);

  return (
    <div>
      {loaded && (
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
            {loaded && (
              <>
                {dogs.map((dog) => {
                  if (validator === dog.category) {
                    // TODO: change imageRef to dog.imageUrl[0] once image hosting is set up
                    return (
                      <ClickableDogCard
                        onClick={() => {
                          setDogPopUp(true);
                          setCurDog(dog);
                        }}
                      >
                        <DogCard name={dog.name} imageRef={Doggo} />
                      </ClickableDogCard>
                    );
                  }
                  return undefined;
                })}
              </>
            )}
          </DogConainer>
        </DogInfoWrapper>
      )}
    </div>
  );
}

function CreateNewDogButton({ onClick }) {
  return (
    <CreateNewDogWrapper onClick={onClick}>
      <AddOverlap>
        <GreenCircleImg src={CreateNew} />
      </AddOverlap>
      <CreateDogButtonText>Create New Dog Profile</CreateDogButtonText>
    </CreateNewDogWrapper>
  );
}

function DogProfile() {
  const [allDogs, setAllDogs] = useState();
  const [loaded, setLoaded] = useState(false);
  const [createNewPopUp, setCreateNewPopUp] = useState(false);
  const [dogPopUp, setDogPopUp] = useState(false);
  const [curDog, setCurDog] = useState();
  const [popUpPresent, setPopUpPresent] = useState(false);

  useEffect(() => {
    // get dogs from backend
    getDogs().then((response) => {
      setAllDogs(response.data.dogs);
      setLoaded(true);
    });
  }, [popUpPresent]);

  useEffect(() => {
    if (createNewPopUp || dogPopUp) {
      setPopUpPresent(true);
    } else {
      setPopUpPresent(false);
    }
  }, [createNewPopUp, dogPopUp]);

  return (
    <DefaultBody>
      <AllContentWrapper>
        {/* toggle display for create a new dog component */}
        {createNewPopUp && <CreateDogPopUp setCreateNewPopUp={setCreateNewPopUp} />}

        {/* toggle display for create a new dog component */}
        {dogPopUp && <DogProfilePopUp setDogPopUp={setDogPopUp} dog={curDog} />}

        <AllDogsWrapper popUp={popUpPresent}>
          <CreateNewDogButton onClick={() => setCreateNewPopUp(!createNewPopUp)} />
          <DogInfoBlock
            blockTitle="New Dogs"
            loaded={loaded}
            dogs={allDogs}
            validator="new"
            setDogPopUp={setDogPopUp}
            setCurDog={setCurDog}
          />
          <DogInfoBlock
            blockTitle="Dogs In Home"
            loaded={loaded}
            dogs={allDogs}
            validator="in home"
            setDogPopUp={setDogPopUp}
            setCurDog={setCurDog}
          />
          <DogInfoBlock
            blockTitle="Adopted Dogs"
            loaded={loaded}
            dogs={allDogs}
            validator="adopted"
            setDogPopUp={setDogPopUp}
            setCurDog={setCurDog}
          />
        </AllDogsWrapper>
      </AllContentWrapper>
    </DefaultBody>
  );
}

export default DogProfile;
