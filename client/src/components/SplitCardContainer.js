/**
 * This is a container for holding two cards as used
 * by the fostermatching page. It sizes them equally
 * using a CSS grid with a gap between them.
 *
 * Takes a titleText prop to determine if extra height
 * should be added to give more space for the title.
 *
 *
 * @summary     Container to hold two cards.
 * @author      Andrew Masek
 *
 */

import React from "react";
import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  margin-left: 1%;
  border-radius: 35px;
`;

export const GridContainer = styled.div`
  place-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2%;
  @media (max-width: 1250px) {
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr;
    row-gap: 2%;
  }
`;
function SplitCardContainer(props) {
  return (
    <Background>
      <GridContainer>{props.children}</GridContainer>
    </Background>
  );
}

export default SplitCardContainer;
