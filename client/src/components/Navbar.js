import React from "react";
import { Nav, NavLink, NavMenu } from "./Navbar_styled";

function Navbar(props) {
  // Pages will be a dictionary with {key: value} = {Page Name: Path to page}
  /*
  Example usage:
    At top of file:
    import Navbar from "../components/Navbar";

    In JSX:
    <Navbar
      pages={{
        "Pending Applications": "/dashboard",
        "Current Fosters": "/fosters",
        "Calendar": "/calendar",
      }}
    />
    
    The pages prop will contain the elements of the navbar and their routes
  */

  return (
    <Nav>
      <NavMenu>
        {Object.entries(props.pages).map(([page, path]) => (
          <NavLink to={path} activeStyle>
            {page}
          </NavLink>
        ))}
      </NavMenu>
    </Nav>
  );
}

export default Navbar;
