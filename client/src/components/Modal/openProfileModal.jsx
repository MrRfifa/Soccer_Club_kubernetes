import React from "react";
import ProfileModal from "./profileModal";
import ChangePasswordModal from "./changePasswordModal";
import ChangeUsernameModal from "./changeUsernameModal";
import TermsandCOnditions from "./TermsandCOnditions";
import DeleteProfileModal from "./DeleteProfileModal";

const OpenProfileModal = () => {
  return (
    <div className="container-fluid">
      <ProfileModal />
      <ChangePasswordModal />
      <ChangeUsernameModal />
      <DeleteProfileModal />
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalToggle"
        style={{ marginLeft: "1100px", marginBottom: "50px" }}
      >
        Update profile
      </button>

      <TermsandCOnditions />
    </div>
  );
};

export default OpenProfileModal;
