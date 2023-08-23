import React from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { animateScroll as scroll } from "react-scroll";
import {
  FooterContainer,
  FooterWrap,
  SocialIconLink,
  SocialIcons,
  SocialLogo,
  SocialMedia,
  SocialMediaWrap,
  WebSiteRights,
} from "./footerElements";

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };
  return (
    <FooterContainer>
      <FooterWrap>
        {/* <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>About US</FooterLinkTitle>
              <FooterLink to="/">Sign in</FooterLink>
              <FooterLink to="/">Anything</FooterLink>
              <FooterLink to="/">Sign up</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>About US</FooterLinkTitle>
              <FooterLink to="/">Sign in</FooterLink>
              <FooterLink to="/">Anything</FooterLink>
              <FooterLink to="/">Sign up</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer> */}
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/" onClick={toggleHome}>
              UrClub
            </SocialLogo>
            <WebSiteRights>
              UrClub &copy; {new Date().getFullYear()} All rights reserved.
            </WebSiteRights>
            <SocialIcons>
              <SocialIconLink
                href="https://www.facebook.com/SBI-Sierra-Bravo-Intelligence-101525152417586/"
                target="_blank"
                aria-label="Facebook"
              >
                <FaFacebook></FaFacebook>
              </SocialIconLink>
              <SocialIconLink
                href="https://www.linkedin.com/company/sierra-bravo-intelligence/"
                target="_blank"
                aria-label="LinkedIn"
              >
                <FaLinkedin></FaLinkedin>
              </SocialIconLink>
              <SocialIconLink
                href="http://www.sierrabravointelligence.com"
                target="_blank"
                aria-label="Website"
              >
                <CgWebsite></CgWebsite>
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
