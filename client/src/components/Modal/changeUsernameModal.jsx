import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ChangeUsernameModal = () => {
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();
  const updateUsername = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        newUsername,
        password,
      };
      const result = await axios.put(
        `http://${import.meta.env.VITE_SERVER_API_URL}:${
          import.meta.env.VITE_SERVER_PORT
        }/auth/changeusername`,
        newData
      );
      if (result.status === 200) {
        toast.success(result.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        await axios.get(
          `http://${import.meta.env.VITE_SERVER_API_URL}:${
            import.meta.env.VITE_SERVER_PORT
          }/auth/logout`
        );
        await getLoggedIn();
        history("/");
        window.location.reload(false);
      }
    } catch (error) {
      toast.error(error.response.data.error);
      setNewUsername("");
      setPassword("");
    }
  };
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModalToggle3"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel3"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel3">
                Username
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={updateUsername}>
                <div
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  <strong>By updating username</strong> you are going to logout
                  automatically.
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="newUsername">New username</label>
                  <input
                    type="text"
                    name="newUsername"
                    value={newUsername}
                    className="form-control"
                    onChange={(e) => {
                      setNewUsername(e.target.value);
                    }}
                    required
                    autoComplete="off"
                    placeholder="New username"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    className="form-control"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                    autoComplete="off"
                    placeholder="Password"
                  />
                </div>

                <div className="form-group mb-3 d-flex justify-content-between">
                  <button className="btn btn-success" type="submit">
                    Update username
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
                Get back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeUsernameModal;
