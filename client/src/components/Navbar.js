/**
 * Navbar Component
 *
 * Component that renders the navbar
 *
 * @summary    reusable and responsive navbar component
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

import React, { useState, useEffect, useContext } from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import burger from "../images/burger.png";
import { signOutUser } from "../services/auth";
import { device } from "../utils/useResponsive";

export const Nav = styled.nav`
  width: max(250px, 16vw);
  height: 100%;
  background-color: #000000;

  ${device.tablet} {
    width: max(180px, 16vw);
  }

  ${device.mobile} {
    position: fixed;
    right: -300px;
    width: min(300px, 45vw);
    height: 100%;
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
    bottom: 100px;
    padding: 25px 0px;
  }
`;

function Navbar(props) {
  const navigate = useNavigate();
  const [renderNav, setRenderNav] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { currentUser } = useContext(AuthContext);

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

  // Redirect to home page when user clicks sign out
  useEffect(() => {
    if (!currentUser) navigate("/");
  }, [currentUser]);

  return (
    <>
      <ToggleNavbar onClick={() => setRenderNav(!renderNav)}>
        <Burger src={burger} alt="burger" />
      </ToggleNavbar>

      {/* Conditionally Rendered Navigation Panel */}

      <div>
        <Nav className={renderNav ? "active" : ""}>
          <NavMenu>
            {Object.entries(props.pages).map(([page, path]) => (
              <NavLink to={path} activeStyle>
                {page}
              </NavLink>
            ))}
            {screenWidth < 750 || renderNav ? (
              <SignOut onClick={signOutUser}>Sign Out</SignOut>
            ) : undefined}
          </NavMenu>
        </Nav>
      </div>
    </>
  );
}

export default Navbar;
