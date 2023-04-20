import React from "react";
import styled from "styled-components";
import DogCard from "./DogProfileCard";

/*
 * Component to show a Foster's profile.
 * Created by Andrew Masek
 * Used in "My Fosters" tab in coordinator view and part 6 of the foster flow
 * props: name, ambassadorName, coordinatorName
 */

const Background = styled.div`
  background-color: black;
  border-radius: 35px;
  text-align: center;
  flex: 1;
  padding: 30px;
`;
const ContentBackground = styled.div`
  background-color: white;
  border-radius: 13.85px;
  padding: 12px;
`;
const Title = styled.div`
  color: white;
  font-size: 33px;
  padding-bottom: 20px;
  font-weight: 700;
  line-height: 40px;
`;
const CardTitle = styled.div`
  font-size: 30px;
`;
const NotesTitle = styled.span`
  font-size: 16px;
`;
const ContentBox = styled.div`
  width: min-content;
  border: 3px solid #8dc442;
  border-radius: 23.6px;
`;
const LeftMargin = styled.div`
  margin-left: 20px;
`;
const TableRow = styled.tr`
  border: solid;
  border-width: 1px 0;
`;
const TableCell = styled.td`
  padding: 16px 0 16px 47px;
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
function FosterProfile(props) {
  return (
    <Background>
      <Title>Foster Profile</Title>
      <ContentBackground>
        <TextBox>
          <TextBoxTitle>{props.name}</TextBoxTitle>
          <FosterProfileTable border="1" frame="void" rules="rows">
            <tbody>
              <TableRow>
                <TableCell>Email: </TableCell>
                <TableCell>{props.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ambassador: </TableCell>
                <TableCell>{props.ambassadorName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Coordinator: </TableCell>
                <TableCell>{props.coordinatorName}</TableCell>
              </TableRow>
            </tbody>
          </FosterProfileTable>
        </TextBox>
        {props.internalNotes && props.internalNotes !== "" && (
          <>
            <NotesTitle>Internal Notes:</NotesTitle>
            <br />
            {props.internalNotes}
          </>
        )}
        {props.fosterHistory && props.fosterHistory.length !== 0 && (
          <ContentBox>
            <CardTitle>Foster History:</CardTitle>

            {props.fosterHistory.map((foster) => (
              <LeftMargin>
                <DogCard imageRef={foster.imageRef} name={foster.name} />
              </LeftMargin>
            ))}
          </ContentBox>
        )}
      </ContentBackground>
    </Background>
  );
}

export default FosterProfile;
