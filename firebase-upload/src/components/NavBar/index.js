import React from "react";
import { Nav, NavLink, NavMenu } from "./NavBarElements";

const NavBar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/outfit-builder" activeStyle>
            Outfit Builder
          </NavLink>
          <NavLink to="/clothing-upload" activeStyle>
            Upload Images of Your Clothing!
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default NavBar;
