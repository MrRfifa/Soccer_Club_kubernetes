import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../../pages/frontend/Navbar";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  async function loginAdmin(e) {
    e.preventDefault();
    try {
      const Data = {
        username,
        password,
      };
      const result = await axios.post(
        "http://localhost:3001/admin/loginadmin",
        Data
      );
      history("/admin/dashboard");
      window.location.reload(false);
      swal("Success!", result.data.message, "success");
    } catch (error) {
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
                <h4>Login</h4>
              </div>
              <div className="card-body">
                <form onSubmit={loginAdmin}>
                  <div className="form-group mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <button className="btn btn-success" type="submit">
                      Login
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

export default Login;
