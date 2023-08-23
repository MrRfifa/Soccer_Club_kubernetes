import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavLogo,
  NavbarContainer,
  NavItem,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Bars,
  NavBtnContainer,
} from "../Navbar/navbarElements";

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo to="/" onClick={toggleHome}>
              Urclub
            </NavLogo>
            <Bars onClick={toggle} />
            <NavMenu>
              <NavItem>
                <NavLink
                  to={"about"}
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-80}
                >
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to={"contact-us"}
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-80}
                >
                  Contact Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to={"service"}
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-80}
                >
                  Services
                </NavLink>
              </NavItem>
            </NavMenu>
            <NavBtnContainer>
              <NavBtn>
                <NavBtnLink to="/sign-in">Sign In</NavBtnLink>
              </NavBtn>
              <NavBtn>
                <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>
              </NavBtn>
            </NavBtnContainer>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
