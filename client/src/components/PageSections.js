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

const Container = styled.div`
  display: flex;
  height: 80vh;
  gap: 80px;
`;

const Content = styled.div`
  overflow-y: scroll;
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: fit-content;
  margin-top: 80px;
`;

const SidebarBorder = styled.div`
  background: ${Colors.green};
  border-radius: 5px;
  width: 10px;
`;

const SectionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;

const SectionButton = styled.div`
  border-radius: 20px 0px 0px 20px;
  padding: 10px 40px;
  background: ${(props) => (props.active ? Colors.green : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  text-align: center;
  font-size: 18px;
  cursor: pointer;
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
    return () => contentRef.current.removeEventListener("scroll", handleScroll);
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
