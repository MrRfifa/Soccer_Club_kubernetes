import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../../pages/frontend/Navbar";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const history = useNavigate();

  async function registerAdmin(e) {
    e.preventDefault();
    try {
      const Data = {
        username,
        password,
        passwordVerify,
      };
      const result = await axios.post(
        `http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/admin/regadmin`,
        Data
      );
      history("/admin/dashboard");
      window.location.reload(false);
      swal("Success!", result.data.message, "success");
    } catch (error) {
      console.log(error);
      swal("Oops!", error.response.data.error, "error");
    }
  }

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Register</h4>
              </div>
              <div className="card-body">
                <form onSubmit={registerAdmin}>
                  <div className="form-group mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      className="form-control"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      required
                      autoComplete="off"
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
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password-confirm">Confirm Password</label>
                    <input
                      type="password"
                      name="password-confirm"
                      value={passwordVerify}
                      className="form-control"
                      onChange={(e) => {
                        setPasswordVerify(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <button className="btn btn-success" type="submit">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
