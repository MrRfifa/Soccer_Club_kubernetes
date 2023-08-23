import React from "react";
import icon1 from "../../assets/images/training.svg";
import icon2 from "../../assets/images/join.svg";
import icon3 from "../../assets/images/parent.svg";
import {
  ServicesCard,
  ServicesContainer,
  ServicesH1,
  ServicesH2,
  ServicesIcon,
  ServicesP,
  ServicesWrapper,
} from "./servicesElements";

const services = () => {
  return (
    <>
      <ServicesContainer id="service">
        <ServicesH1>Our Services</ServicesH1>
        <ServicesWrapper>
          <ServicesCard>
            <ServicesIcon src={icon1} />
            <ServicesH2>Lorem ipsum dolor sit amet</ServicesH2>
            <ServicesP>
              {" "}
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua
            </ServicesP>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={icon2} />
            <ServicesH2>Lorem ipsum dolor sit amet</ServicesH2>
            <ServicesP>
              {" "}
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua
            </ServicesP>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={icon3} />
            <ServicesH2>Lorem ipsum dolor sit amet</ServicesH2>
            <ServicesP>
              {" "}
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua
            </ServicesP>
          </ServicesCard>
        </ServicesWrapper>
      </ServicesContainer>
    </>
  );
};

export default services;
