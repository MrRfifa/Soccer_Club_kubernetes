import React from "react";
import AnonymousContactUsModal from "../Modal/AnonymousContactUsModal";
import {
  InfoContainer,
  Column1,
  InfoRow,
  InfoWrapper,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  Column2,
  ImgWrap,
  Img,
} from "./infoElements";

const InfoSection = ({
  lightBg,
  id,
  imgStart,
  topLine,
  headline,
  description,
  lightText,
  darkText,
  img,
  alt,
  button,
}) => {
  return (
    <>
      <AnonymousContactUsModal />
      <InfoContainer lightBg={lightBg} id={id}>
        <InfoWrapper>
          <InfoRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine>{topLine}</TopLine>
                <Heading lightText={lightText}>{headline}</Heading>
                <Subtitle darkText={darkText}>{description}</Subtitle>
              </TextWrapper>
              {button && (
                <>
                  <button
                    className="btn btn-outline-success btn-lg"
                    data-bs-toggle="modal"
                    data-bs-target="#anonymousModal"
                  >
                    Contact-Us
                  </button>
                </>
              )}
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} />
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
