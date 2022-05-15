import styled from "styled-components";
import React from "react";

// Styling for after meet and greet component
const AfterContainer = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  background-color: white;
  border-radius: 15px;
`;

const AfterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2vw;
`;

const Title = styled.h3`
  margin: 0;
  margin: 18.72px 0;
  text-align: center;
`;

const SuppliesTitle = styled.h3`
  margin: 0;
  text-align: center;
`;

const DogsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2vh;
`;

const InlineInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1vh 0vh;
`;

const Lefttext = styled.p`
  margin: 0;
  margin-left: 1.5vw;
`;

const CircledText = styled.div`
  ${(props) => (props.circle ? "border: 3px solid black;" : "")};
  box-sizing: border-box;
  padding: 8px 30px;
  border-radius: 5px;
  margin-right: 1.5vw;
`;

const SupplyWrappper = styled.div`
  height: 20vh;
  min-height: 248px;
  padding: 10px;

  border: 3px solid #8dc442;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 3vh;
`;

const Supplies = styled.ul``;
const Supply = styled.li``;

function After(props) {
  return (
    <AfterContainer>
      <AfterContent>
        <Title>After Meet & Greet</Title>
        <DogsWrapper>
          <InlineInfo>
            <Lefttext>Dog Met:</Lefttext>
            <CircledText>{props.dogMet}</CircledText>
          </InlineInfo>
          <InlineInfo>
            <Lefttext>Dog in home:</Lefttext>
            <CircledText circle>{props.dogHome}</CircledText>
          </InlineInfo>
        </DogsWrapper>
        <SupplyWrappper>
          <SuppliesTitle>Supplies Checklist</SuppliesTitle>
          <Supplies>
            {props.supplies.map((supply) => (
              <Supply>{supply}</Supply>
            ))}
          </Supplies>
        </SupplyWrappper>
      </AfterContent>
    </AfterContainer>
  );
}

export default After;
