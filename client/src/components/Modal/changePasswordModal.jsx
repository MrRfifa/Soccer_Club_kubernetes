import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ChangePasswordModal = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        oldPassword,
        newPassword,
        newPasswordConfirm,
      };
      const result = await axios.put(
        "http://localhost:3001/auth/changepassword",
        newData
      );
      if (result.status === 200) {
        console.log(result);
        toast.success(result.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.reload(false);
        setNewPassword("");
        setOldPassword("");
        setNewPasswordConfirm("");
      }
    } catch (error) {
      toast.error(error.response.data.error);
      setNewPassword("");
      setOldPassword("");
      setNewPasswordConfirm("");
    }
  };
  return (
    <div>
      <div
        className="modal fade"
        // data-backdrop="false"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">
                Password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={updatePassword}>
                <div className="form-group mb-3">
                  <label htmlFor="oldPassword">Old password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={oldPassword}
                    className="form-control"
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                    }}
                    required
                    autoComplete="off"
                    placeholder="Old password"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="newPassword">New password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    className="form-control"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    required
                    autoComplete="off"
                    placeholder="New password"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="newPasswordConfirm">
                    Retype your new password
                  </label>
                  <input
                    type="password"
                    name="newPasswordConfirm"
                    value={newPasswordConfirm}
                    className="form-control"
                    onChange={(e) => {
                      setNewPasswordConfirm(e.target.value);
                    }}
                    required
                    autoComplete="off"
                    placeholder="Confirm password"
                  />
                </div>

                <div className="form-group mb-3 d-flex justify-content-between">
                  <button className="btn btn-success" type="submit">
                    Update password
                  </button>
                  <button
                    className="btn btn-secondary "
                    type="button"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                get back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
