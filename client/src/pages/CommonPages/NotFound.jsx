import React from "react";
import pagenotfoundImage from "../../assets/images/pagenotfound.jpg";

const PageNotFound = () => {
  return (
    <div
      className="pageNotFound"
      style={{
        height: "50vh",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5em",
        width: "800px",
        marginLeft: "500px",
      }}
    >
      <h1>Oops..! 404 Page Not Found</h1>
      <p>Looks like you came to wrong page on our server</p>
      <img src={pagenotfoundImage} height="500" width="500" alt="not found" />
    </div>
  );
};

export default PageNotFound;
