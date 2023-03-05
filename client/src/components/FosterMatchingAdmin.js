import { React, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Colors } from "./Theme";
import SplitCardContainer from "./SplitCardContainer";
import PenIcon from "../images/penicon.png";
import GridImage3 from "../images/griddog3.png";
import { getDogs } from "../services/dogs";

/**
 * This component is used as the fourth step of the
 * applications process for admins to manage user
 * profiles and select dogs to match with them.
 *
 *
 * Doesn't take any props.
 *
 * Used primarily in step 4 of applications process
 *
 *
 * @summary     Component to allow admins to manage user
 *              profile and dog selection.
 * @author      Andrew Masek
 *
 */

const FosterProfileContainer = styled.div`
  text-align: center;
  width: 100% !important;
  height: 100%;
  background-color: black;
  border-radius: 15px;
  padding: 5px 20px 20px 20px;
  box-sizing: border-box;
`;
const AvailableDogsContainer = styled.div`
  text-align: center;
  width: 100% !important;
  height: 100%;
  background-color: black;
  border-radius: 15px;
  padding: 5px 20px 20px 20px;
  box-sizing: border-box;
`;

const OuterContainer = styled.div`
  max-width: 100vw;
`;
const PaddingContainer = styled.div`
  padding-bottom: 15px;
`;
const TitleText = styled.span`
  color: white;
  width: inherit;
  font-size: 33px;
  font-weight: 700;
  line-height: 40px;
`;
const TextBox = styled.div`
  background-color: white;
  border-radius: 25px;
  margin-top: 12px;
  padding: 5px 22px 0 22px;
`;
const TextBoxTitle = styled.span`
  font-weight: 700;
  line-height: 36px;
  font-size: 30px;
`;
const FosterProfileTable = styled.table`
  width: 100%;
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  border-collapse: collapse;
  text-align: left;
  tr:first-child {
    border-top: none;
  }
  tr:last-child {
    border-bottom: none;
  }
`;
const TableRow = styled.tr`
  border: solid;
  border-width: 1px 0;
`;

const EmailDecoration = styled.span`
  text-decoration-line: underline;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
`;
const UpdateContainer = styled.div`
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  padding: 4px;
  background-color: ${Colors.green};
`;

const GeneralNotes = styled.span`
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  text-align: left;
`;

const InternalNotes = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  text-align: left;
  padding-top: 12px;
`;
const TableCell = styled.td`
  padding: 16px 0 16px 47px;
`;
const ViewApplicationButton = styled.button`
  background-color: ${Colors.green};
  border-radius: 10px;
  border: none;
  font-size: 20px;
  line-height: 24px;
  padding: 5px 30px;
  cursor: pointer;
`;

const EditButton = styled.button`
  position: absolute;
  top: ${(props) => (props.topOffset ? props.topOffset : "0")};
  left: ${(props) => (props.leftOffset ? props.leftOffset : "0")};
  display: flex;
  gap: 2px;
  font-size: 22.2876px;
  line-height: 19px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const EditButtonParent = styled.div`
  position: relative;
`;

function FloatingEditButton(props) {
  return (
    <EditButtonParent>
      <EditButton topOffset={props.topOffset} leftOffset={props.leftOffset}>
        <img src={PenIcon} alt="edit icon" />
        <span>Edit</span>
      </EditButton>
    </EditButtonParent>
  );
}

const TextLeftAlign = styled.div`
  text-align: left;
`;

const CenterAlign = styled.div`
  width: 100%;
  text-align: center;
`;

const SubtitleText = styled.div`
  padding-top: 20px;
  padding-bottom: 15px;
  font-size: 20px;
  color: white;
`;

const DogGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 2.7%;
  row-gap: 30px;
  max-height: 550px;
  overflow-y: auto;
`;

const DogCardBackground = styled.div`
  height: 111px;
  border-radius: 7.8px;
  top: ${(props) => (props.topOffset ? props.topOffset : "0")};
  background-color: ${(props) => (props.checked === true ? "#E3F7C7" : "white")};
  text-align: center;
  color: black;
  font-size: 13px;
  padding-top: 8px;
  position: relative;
  cursor: pointer;
`;

const DogCardCheckbox = styled.input`
  position: absolute;
  top: ${(props) => (props.topOffset ? props.topOffset : "0")};
  left: ${(props) => (props.leftOffset ? props.leftOffset : "0")};
  cursor: pointer;
  :checked {
    accent-color: ${Colors.green};
  }
`;
const DogCardImage = styled.img`
  max-width: calc(100% - 24px);
  object-fit: contain;
  padding: 0 14px;
`;

function DogCard(props) {
  const [checked, setChecked] = useState(false);
  let checkboxDOMElement;

  const checkbox = (
    <DogCardCheckbox
      leftOffset="calc(87% - 8px)"
      topOffset="80%"
      type="checkbox"
      ref={(c) => {
        checkboxDOMElement = c;
      }}
    />
  );
  useEffect(() => {
    checkboxDOMElement.checked = checked;
  }, [checked]);

  return (
    <DogCardBackground
      checked={checked}
      onClick={(_) => props.updateCard(setChecked, !checked, checkboxDOMElement, props.id)}
    >
      <DogCardImage src={props.dogImage} alt={props.dogName} />
      <br />
      {props.dogName}
      {checkbox}
    </DogCardBackground>
  );
}
function DogGrid(props) {
  const [dogs, setDogs] = useState([]);
  const { selectedDogs, setSelectedDogs } = props.selectedDogs;

  const MAX_CHECKED_CARDS = 5;

  useEffect(() => {
    getDogs().then((res) => setDogs(res.data.dogs));
  }, []);

  const tryCheckDogCard = useCallback((cardSetChecked, newValue, checkboxDOMElement, id) => {
    if (newValue) {
      if (selectedDogs.size + 1 <= MAX_CHECKED_CARDS) {
        cardSetChecked(true);
        setSelectedDogs((prev) => new Set(prev).add(id));
      } else {
        checkboxDOMElement.checked = false;
      }
    } else {
      cardSetChecked(false);
      setSelectedDogs((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  });

  return (
    <DogGridStyled>
      {dogs.map((dog) => {
        if (dog.category === "adopted") return;
        return (
          <DogCard
            dogName={dog?.name}
            dogImage={GridImage3}
            updateCard={tryCheckDogCard}
            id={dog?._id}
            setSelectedDogs={setSelectedDogs}
          />
        );
      })}
    </DogGridStyled>
  );
}

const SubmitButton = styled.button`
  background-color: ${Colors.green};
  border: none;
  font-size: 25px;
  padding: 9px 38px;
  margin-top: 24px;
  border-radius: 10px;
  cursor: pointer;
`;

function FosterMatchingAdmin({ handleConfirm, selectedDogs }) {
  return (
    <OuterContainer>
      <PaddingContainer>
        <SplitCardContainer>
          <FosterProfileContainer>
            <TitleText>Foster Profile</TitleText>
            <TextBox>
              <TextBoxTitle>Shelby</TextBoxTitle>
              <FosterProfileTable border="1" frame="void" rules="rows">
                <tbody>
                  <TableRow>
                    <TableCell>Contact Info: </TableCell>
                    <TableCell>
                      123-456-7890
                      <br />
                      <EmailDecoration>shelby@gmail.com</EmailDecoration>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Currently Fostering?</TableCell>
                    <TableCell>No</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Matching Status</TableCell>
                    <TableCell>
                      <FlexContainer>
                        <span>Step 4</span>
                        <UpdateContainer>Status Updated</UpdateContainer>{" "}
                      </FlexContainer>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Last Active</TableCell>
                    <TableCell>4/23/2021</TableCell>
                  </TableRow>
                </tbody>
              </FosterProfileTable>
              <FloatingEditButton topOffset="-11px" leftOffset="calc(97% - 45px)" />
              <br />
              <br />
              <ViewApplicationButton>View Application</ViewApplicationButton>
              <br />
              <br />
            </TextBox>
            <TextBox>
              <TextBoxTitle>Internal Foster Notes</TextBoxTitle>
              <TextLeftAlign>
                <br />
                <GeneralNotes>General Notes:</GeneralNotes>
                <FloatingEditButton topOffset="-28px" leftOffset="calc(97% - 45px)" />
                <br />
                <InternalNotes>
                  Looking for a medium size to large size dog. Does have other dogs at home...
                </InternalNotes>
              </TextLeftAlign>
            </TextBox>
          </FosterProfileContainer>
          <AvailableDogsContainer>
            <TitleText>Available Dogs</TitleText>
            <SubtitleText>Scroll to view all available dogs</SubtitleText>
            <DogGrid selectedDogs={selectedDogs} />
          </AvailableDogsContainer>
        </SplitCardContainer>
        <CenterAlign>
          <SubmitButton onClick={handleConfirm}>Confirm</SubmitButton>
        </CenterAlign>
      </PaddingContainer>
    </OuterContainer>
  );
}

export default FosterMatchingAdmin;
