import playerImage from "../../assets/images/player.svg";
import fansImage from "../../assets/images/fans.svg";

export const homeObjOne = {
  id: "about",
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: "Lorem Ipsum",
  headline:
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a nunc dolor. Donec finibus libero leo, vel egestas quam bibendum dignissim. Mauris tincidunt tincidunt placerat..",
  imgStart: false,
  img: playerImage,
  alt: "football image",
  darkText: false,
  button: false,
};

export const homeObjTwo = {
  id: "contact-us",
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: "Lorem Ipsum",
  headline:
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a nunc dolor. Donec finibus libero leo, vel egestas quam bibendum dignissim. Mauris tincidunt tincidunt placerat..",
  imgStart: true,
  img: fansImage,
  alt: "football image",
  darkText: true,
  button: true,
};
