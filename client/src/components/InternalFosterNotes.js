import React from 'react'
import styled from "styled-components";
import { device } from "../utils/useResponsive";


const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  color: black;
  background: #ffffff;
  border-radius: 15px;
`;

const AllWrapper = styled.div`
  margin: 0px 20px;
  margin-bottom: 30px;
  font-size: 18px;
  display: flex;
  flex-direction: column;

  ${device.tablet}{
      padding-bottom: 30px;
  }
`;

const Title = styled.p`
margin:0;
text-align: center;
font-weight: 700;
font-size: 22.2876px;
padding: 2vh 0;
`;

const Value = styled.div`
  height: 40%;
  overflow: hidden;
`;


function InternalFosterNotes(props) {
    return (
        <ContentContainer>
            <AllWrapper>
                <Title>Internal Foster Notes</Title>
                <Value>{props.internalNotes}</Value>
            </AllWrapper>
        </ContentContainer>
    )
}

export default InternalFosterNotes;