import React from "react";
import Slider from "../../components/Slider/Slider";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";

const Parent = () => {
  return (
    <div
      style={{
        marginTop: "70px",
        marginLeft: "0px",
      }}
    >
      <h4 className="font-monospace">
        <strong
          className="badge bg-secondary text-wrap"
          style={{ marginLeft: "10px", width: "12rem" }}
        >
          UrClub Academy
        </strong>{" "}
        is your kid way for success
      </h4>
      <Slider img1={img1} img2={img2} img3={img3} />
    </div>
  );
};

export default Parent;
