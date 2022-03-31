/**
 * Navbar Component
 *
 * Component that renders the navbar
 *
 * @summary    resuable and responsive navbar component
 * @author     Parth Patel
 *
 */

/**
 * Navbar usage:
 * Pages will be a dictionary with {key: value} = {Page Name: Path to page}
 * The pages prop will contain the elements of the navbar and their routes
 *
 * Example usage:
 *   <Navbar
 *     pages={{
 *       "Pending Applications": "/dashboard",
 *       "Current Fosters": "/fosters",
 *       "Calendar": "/calendar",
 *     }}
 *   />
 */

import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import burger from "../images/burger.png";

export const Nav = styled.nav`
  position: fixed;
  width: max(250px, 16vw);
  height: calc(100% - 130px);
  top: 130px;
  background-color: #000000;

  @media screen and (max-width: 750px) {
    top: 97px;
    right: -300px;
    width: min(300px, 45vw);
    height: calc(100% - 97px);
    z-index: 5;
    transform: translateX(0%);
    transition: right 0.5s;

    &.active {
      right: 0px;
      transition: right 1s ease;
    }
  }
`;

export const ToggleNavbar = styled.button`
  display: none;

  @media screen and (max-width: 750px) {
    display: inline;
    position: fixed;
    right: 5%;
    top: 40px;
    z-index: 101;

    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;

export const Burger = styled.img`
  z-index: 5;
`;

export const NavMenu = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;

export const NavLink = styled(Link)`
  text-decoration: none;

  font-family: Myriad Pro;
  font-style: normal;
  font-weight: bold;
  font-size: max(18px, min(24px, 2vw));
  line-height: 29px;
  text-align: center;
  color: #ffffff;

  width: 100%;
  padding: 25px 0px;

  &.active {
    background-color: #8dc442;
  }
  @media screen and (max-width: 750px) {
    font-size: min(18px, 4vw);
  }
`;

export const SignOut = styled.button`
  display: none;
  @media screen and (max-width: 750px) {
    display: block;
    text-decoration: none;

    font-family: Myriad Pro;
    font-style: normal;
    font-weight: bold;
    font-size: max(14px, min(18px, 4vw));
    line-height: 29px;
    background-color: #000000;
    background: none;
    color: #ffffff;
    border: none;
    padding: 0;
    cursor: pointer;

    position: absolute;
    bottom: 0;

    padding: 25px 0px;
  }
`;

function Navbar(props) {
  const [renderNav, setRenderNav] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Update screenHeight to viewport size
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  // logout function
  const logout = () => {
    // code to log user out of page
  };

  return (
    <>
      <ToggleNavbar onClick={() => setRenderNav(!renderNav)}>
        <Burger src={burger} alt="burger" />
      </ToggleNavbar>

      {/* Conditionally Rendered Navigation Panel */}

      <Nav className={renderNav ? "active" : ""}>
        <NavMenu>
          {Object.entries(props.pages).map(([page, path]) => (
            <NavLink to={path} activeStyle>
              {page}
            </NavLink>
          ))}
          {screenWidth < 750 || renderNav ? (
            <SignOut onClick={() => logout()}>Sign Out</SignOut>
          ) : undefined}
        </NavMenu>
      </Nav>
    </>
  );
}

export default Navbar;
