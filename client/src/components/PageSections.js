/**
 * Page Sections Component
 *
 * Component that renders side navigation buttons that scroll a page section into view when clicked
 *
 * Used on: Applications
 *
 * Props:
 *  - sections [object] - object mapping section names (strings) to React refs "bookmarking" their locations on the page
 *       - ex:
 *              {
 *                  "Personal Information": personalInfoRef,
 *                  "Foster Information": fosterInfoRef,
 *                  "Outside Information": outsideInfoRef,
 *              }
 *  - children [ReactElement] - the actual content to render next to the side navigation buttons (see Applications.js for an example usage)
 */

import React from "react";
import styled from "styled-components";
import { Colors } from "./Theme";
import { device } from "../utils/useResponsive";

const Container = styled.div`
  display: flex;
  flex: 1;
  max-height: 80vh;
  gap: 80px;
  ${device.mobile} {
    flex-direction: column;
    flex: 5;
    gap: 10px;
    max-height: 100vh;
  }
`;

const Content = styled.div`
  overflow-y: scroll;
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: fit-content;
  margin-top: 80px;
  ${device.mobile} {
    flex-direction: column;
    margin: 5px;
    width: 80%;
    align-self: end;
  }
`;

const SidebarBorder = styled.div`
  background: ${Colors.green};
  border-radius: 5px;
  width: 10px;
  ${device.mobile} {
    height: 5px;
    width: 100%;
  }
`;

const SectionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  ${device.mobile} {
    flex: 1;
    flex-direction: row;
    margin: 0;
    gap: 0;
  }
`;

const SectionButton = styled.div`
  border-radius: 20px 0px 0px 20px;
  padding: 10px 40px;
  background: ${(props) => (props.active ? Colors.green : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  flex: 1;
  ${device.mobile} {
    border-radius: 4px;
    padding: 10px 2px;
    font-size: 3vw;
  }
`;

function PageSections({ sections, children }) {
  const contentRef = React.useRef();
  const [currentSection, setCurrentSection] = React.useState(Object.keys(sections)[0]);

  function handleScroll() {
    const contentContainerTop = contentRef.current.getBoundingClientRect().top;

    Object.entries(sections).forEach(([section, ref]) => {
      const sectionTop = ref.current.getBoundingClientRect().top;
      if (sectionTop - 20 < contentContainerTop) setCurrentSection(section);
    });
  }

  React.useEffect(() => {
    contentRef.current.addEventListener("scroll", handleScroll);
  }, []);

  function scrollSectionIntoView(section) {
    sections[section].current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Container>
      <SidebarContainer>
        <SectionButtonContainer>
          {Object.keys(sections).map((section) => (
            <SectionButton
              key={section}
              onClick={() => scrollSectionIntoView(section)}
              active={currentSection === section}
            >
              {section}
            </SectionButton>
          ))}
        </SectionButtonContainer>
        <SidebarBorder />
      </SidebarContainer>
      <Content ref={contentRef}>{children}</Content>
    </Container>
  );
}

export default PageSections;
