import React from "react";
import {
  Nav,
  NavLink,
  NavMenu,
} from './Navbar_styled';


function Navbar(props) {
  // Pages will be a dictionary with {key: value} = {Page Name: Path to page}
  /*
  Example usage:
    <Navbar
    pages={{
      "Pending Applications": "/dashboard",
      "Current Fosters": "/fosters",
      "Calendar": "/calendar",
    }}
  />
  */
  const pages = props.pages;

  return (
    <Nav>
      <NavMenu>
        {Object.entries(pages).map(([page, path]) => (
          <NavLink to={path} activeStyle>
            {page}
          </NavLink>
        ))}
      </NavMenu>
    </Nav>
  );
}

export default Navbar;
