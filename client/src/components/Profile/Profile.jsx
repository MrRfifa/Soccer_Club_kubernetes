import React from "react";
import OpenProfileModal from "../Modal/openProfileModal";

const Profile = () => {
  return (
    <div className="container-fluid">
      <h1
        style={{
          marginTop: "70px",
          marginLeft: "100px",
        }}
      >
        Profile{" "}
      </h1>
      <OpenProfileModal />
    </div>
  );
};

export default Profile;
