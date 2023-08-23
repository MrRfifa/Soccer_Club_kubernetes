import React, { useState } from "react";
import Video from "../../assets/video/video.mp4";
import { Button } from "../buttonElement";
import { useNavigate } from "react-router-dom";
import {
  MainContainer,
  MainBg,
  VideoBg,
  MainBtnWrapper,
  ArrowForward,
  ArrowRight,
  MainContent,
  MainH1,
  MainP,
} from "./mainElements";

const MainSection = () => {
  const [hover, setHover] = useState(false);
  const history = useNavigate();
  const onHover = () => {
    setHover(!hover);
  };
  const navigate = () => {
    history("/sign-up");
  };

  return (
    <MainContainer id="home">
      <MainBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </MainBg>
      <MainContent>
        <MainH1>Urclub Academy</MainH1>
        <MainP>Your way for success</MainP>
        <MainBtnWrapper>
          <Button
            to="sign-up"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            onClick={navigate}
          >
            Get started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </MainBtnWrapper>
      </MainContent>
    </MainContainer>
  );
};

export default MainSection;
