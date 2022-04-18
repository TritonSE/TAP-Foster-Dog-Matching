/**
 * Form Components
 *
 * Components that aid in making layouts for forms
 *
 * Used on: Application
 *
 * Props: [see components below for their props]
 *
 * Usage:
 *     import Form from "../components/Form";
 *     <Form.Container>
 *        <Form.Title></Form.Title>
 *        ....
 *     </Form.Container>
 */

import React from "react";
import styled from "styled-components";
import useResponsive, { device } from "../utils/useResponsive";
import { Colors } from "./Theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${device.mobile} {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  ${device.mobile} {
    font-size: 5vw;
  }
`;

const SectionContainer = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
  ${device.mobile} {
    font-size: 4vw;
  }
`;

const SectionBorder = styled.div`
  height: 4px;
  background: ${Colors.green};
  margin-bottom: 10px;
`;

/**
 * Section Component
 *
 * Renders a section title under a separating bar and the section contents
 *
 * Props:
 *  - title [string] - title to display above contents
 *  - children [ReactElement] - content of this section
 *  - ref [ReactRef?] - optional. ref to attach (ie. for use with PageSections component)
 */

const Section = React.forwardRef(({ title, children }, ref) => (
  <SectionContainer ref={ref}>
    <SectionBorder />
    <SectionTitle>{title}</SectionTitle>
    {children}
  </SectionContainer>
));

const SubSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const SubSectionLabel = styled.div`
  flex: 1;
  font-weight: bold;
  font-size: 20px;
  ${device.mobile} {
    font-size: 3vw;
  }
`;

const SubSectionChildren = styled.div`
  flex: ${(props) => props.flex || 1};
  display: flex;
  flex-direction: column;
  gap: 14px;
  ${device.mobile} {
    flex: 3;
  }
`;

/**
 * SubSection Component
 *
 * Renders a sub-section title to the left of the contents
 *
 * Props:
 *  - title [string] - title to display to the left of contents
 *  - children [ReactElement] - content of this sub-section
 */

function SubSection({ title, children }) {
  const { isMobile } = useResponsive();

  return (
    <SubSectionContainer>
      {title && <SubSectionLabel>{title}</SubSectionLabel>}
      <SubSectionChildren flex={2}>{children}</SubSectionChildren>
      {title && !isMobile && <SubSectionChildren />}
    </SubSectionContainer>
  );
}

const Form = {
  Container,
  Title,
  Row,
  Column,
  Section,
  SubSection,
  Actions,
};

export default Form;
