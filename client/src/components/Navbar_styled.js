import { NavLink as Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
 0% { right: -50%; }
 20% { right: -40%; }
 40% { right: -30%; }
 60% { right: -20%; }
 80% { right: -10%; }
 100% { right: 0%; }
`;

export const Nav = styled.nav`
  position: absolute;
  width: max(250px, 16vw);
  height: 85%;
  top: 15%;
  background-color: #000000;

  @media screen and (max-width: 750px) {
    top: 15%;
    right: 0%;
    width: min(300px, 45vw);
    z-index: 5;

    animation-name: ${slideIn};
    animation-duration: 0.5s;
    animation-iteration-count: 1;
    }
  }
`;

export const ToggleNavbar = styled.button`
  display: none;


  @media screen and (max-width: 750px) {
    display: inline;
    position: absolute;
    right: 5%;
    top: 5%;

    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;

}
  }
`;

export const Burger = styled.img``;

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
