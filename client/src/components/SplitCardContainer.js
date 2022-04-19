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
  width: 100%;
  margin-left: 1%;
  height: ${(props) => (props.titleText ? "696px" : "619px")};
  border-radius: 35px;
`;

export const GridContainer = styled.div`
  place-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 4.5%;
`;
function SplitCardContainer(props) {
  return (
    <Background>
      <GridContainer>{props.children}</GridContainer>
    </Background>
  );
}

export default SplitCardContainer;
