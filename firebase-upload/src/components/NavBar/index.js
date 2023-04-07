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
            Closet Builder
          </NavLink>
          <NavLink to="/past-outfits" activeStyle>
            Past Outfits
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default NavBar;
