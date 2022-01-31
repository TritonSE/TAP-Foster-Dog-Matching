import { NavLink as Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
 0% { right: -100%;}
 30% { right: -75%; }
 40% { right: -50%; }
 100% { right: 0% }
`;

export const Nav = styled.nav`
  position: absolute;
  width: max(250px, 22vw);
  height: 85%;
  top: 15%;
  background-color: #000000;

  @media screen and (max-width: 750px) {
    top: 15%;
    right: 0%;
    width: max(250px, 22vw);

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
`;

export const NavLink = styled(Link)`
  text-decoration: none;

  font-family: Myriad Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: #ffffff;

  padding: 25px 0px;

  &.active {
    background-color: #8dc442;
  }
`;

export const SignOut = styled.button`
  text-decoration: none;

  font-family: Myriad Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  background-color: #000000;
  background: none;
  color: #ffffff;
  border: none;
  padding: 0;
  cursor: pointer;

  position: absolute;
  bottom: 0;
  left: 34%;

  padding: 25px 0px;
`;
