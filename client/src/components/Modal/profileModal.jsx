import React, { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";

const ProfileModal = () => {
  const { lastName, firstName } = useContext(AuthContext);
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModalToggle"
        data-backdrop="false"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Welcome{" "}
              {lastName[0].toUpperCase() +
                lastName.substring(1) +
                " " +
                firstName[0].toUpperCase() +
                firstName.substring(1)}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary text-black"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                Change password
              </button>
              <button
                className="btn btn-info text-black"
                data-bs-target="#exampleModalToggle3"
                data-bs-toggle="modal"
              >
                Change username
              </button>
              <button
                type="button"
                className="btn btn-danger text-black"
                data-bs-target="#exampleModalToggle4"
                data-bs-toggle="modal"
              >
                Delete profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
