import React, { useState, useEffect } from "react";
import { Nav, NavLink, NavMenu, ToggleNavbar, Burger, SignOut } from "./Navbar_styled";
import burger from "./burger.png";

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
        <Burger src={burger} />
      </ToggleNavbar>

      {/* Conditionally Rendered Navigation Panel */}
      {renderNav || screenWidth > 750 ? (
        <Nav>
          <NavMenu>
            {Object.entries(props.pages).map(([page, path]) => (
              <NavLink to={path} activeStyle>
                {page}
              </NavLink>
            ))}
            {screenWidth < 750 || renderNav ? (
              <SignOut onClick={() => logout()}>Sign Out</SignOut>
            ) : (
              <></>
            )}
          </NavMenu>
        </Nav>
      ) : (
        <></>
      )}
    </>
  );
}

export default Navbar;
