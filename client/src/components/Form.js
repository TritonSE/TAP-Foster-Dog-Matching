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
`;

const SectionContainer = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
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

const Section = React.forwardRef(function ({ title, children }, ref) {
  return (
    <SectionContainer ref={ref}>
      <SectionBorder />
      <SectionTitle>{title}</SectionTitle>
      {children}
    </SectionContainer>
  );
});

const SubSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const SubSectionLabel = styled.div`
  flex: 1;
  font-weight: bold;
  font-size: 20px;
`;

const SubSectionChildren = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
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

const SubSection = function ({ title, children }) {
  return (
    <SubSectionContainer>
      {title && <SubSectionLabel>{title}</SubSectionLabel>}
      <SubSectionChildren>{children}</SubSectionChildren>
      {title && <SubSectionChildren />}
    </SubSectionContainer>
  );
};

const Form = {
  Container,
  Title,
  Row,
  Column,
  Section,
  SubSection,
};

export default Form;
