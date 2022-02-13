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

const Section = function ({ title, children, id }) {
  return (
    <SectionContainer id={id}>
      <SectionBorder />
      <SectionTitle>{title}</SectionTitle>
      {children}
    </SectionContainer>
  );
};

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

const SubSection = function ({ title, children }) {
  return (
    <SubSectionContainer>
      {title && <SubSectionLabel>{title}</SubSectionLabel>}
      <SubSectionChildren>{children}</SubSectionChildren>
      <SubSectionChildren />
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
