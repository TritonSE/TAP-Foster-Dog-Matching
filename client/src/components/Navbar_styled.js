import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  position: absolute;
  width: min(350px, 22vw);
  height: 85%;
  top: 15%;
  background-color: #000000;

  @media screen and (max-width: 750px) {
    top: 15%;
    right: 0%;
    width: 25%;

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
