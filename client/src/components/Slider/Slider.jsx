import React from "react";

const Slider = ({ img1, img2, img3 }) => {
  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="10000">
          <img
            src={img1}
            className="d-block w-100"
            alt="..."
            style={{ height: 600 }}
          />
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img
            src={img2}
            className="d-block w-100"
            alt="..."
            style={{ height: 600 }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={img3}
            className="d-block w-100"
            alt="..."
            style={{ height: 600 }}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
