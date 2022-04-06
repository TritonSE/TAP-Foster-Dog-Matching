/**
 * Button with an icon image that takes a target for its link and
 * optionally supports absolute offsets to position it if given a
 * relatively positioned parent. Used primarily in DashboardCards.
 *
 *
 * @summary     Button with an icon image.
 * @author      Andrew Masek
 *
 */

import React from "react";
import styled from "styled-components";

export const Background = styled.div`
  background-color: black;
  width: 100%;
  margin-left: 1%;
  height: ${(props) => (props.titleText ? "696px" : "619px")};
  border-radius: 35px;
`;
export const TitleText = styled.div`
  padding-top: 15px;
  padding-bottom: 19px;
  width: 100%;
  font-family: "Nunito";
  font-size: 33px;
  text-align: center;
  font-weight: 700;
  color: white;
`;

export const GridContainer = styled.div`
  place-items: center;
  display: grid;
  grid-template-columns: 1.329fr 1fr;
  column-gap: 3.5%;
`;
function MainContentCard(props) {
  return (
    <Background>
      {props.titleText && <TitleText>{props.titleText}</TitleText>}
      <GridContainer>{props.children}</GridContainer>
    </Background>
  );
}

export default MainContentCard;
