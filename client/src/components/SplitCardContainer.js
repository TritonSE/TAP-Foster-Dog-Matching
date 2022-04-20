/**
 * This is a container for holding two cards as used
 * by the fostermatching page. It sizes them equally
 * using a CSS grid with a gap between them.
 *
 * Takes a titleText prop to determine if extra height
 * should be added to give more space for the title.
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
