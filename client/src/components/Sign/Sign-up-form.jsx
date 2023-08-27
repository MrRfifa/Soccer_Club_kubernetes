import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [type, setType] = useState("Parent");
  const history = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

  async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        lastName,
        firstName,
        username,
        password,
        passwordVerify,
        type,
      };

      const result = await axios.post(
        `http://${import.meta.env.VITE_SERVER_API_URL}:${
          import.meta.env.VITE_SERVER_PORT
        }/auth/reg`,
        registerData,
        { withCredentials: true }
      );
      swal("Success!", result.data.message, "success");
      await getLoggedIn();
      history(`/${type.toLowerCase()}`);
    } catch (error) {
      swal("Oops!", error.response.data.error, "error");
    }
  }

  return (
    <div
      style={{
        minHeight: 692,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 0,
        overflow: "hidden",
        background:
          "linear-gradient(207deg, rgba(153,226,180,1) 0%, rgba(88,171,86,1) 52%, rgba(24,167,59,1) 100%)",
      }}
    >
      <div
        style={{
          height: "5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Link
          to="/"
          style={{
            marginLeft: 32,
            marginTop: 32,
            textDecoration: "none",
            color: "#fff",
            fontWeight: "700",
            fontSize: 32,
            width: 120,
          }}
        >
          UrClub
        </Link>
      </div>
      <div className="container py-5 ">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Sign up</h4>
              </div>
              <div className="card-body">
                <form onSubmit={register}>
                  <div className="form-group mb-3">
                    <label htmlFor="lastname">Last name</label>
                    <input
                      type="text"
                      name="lastname"
                      value={lastName}
                      className="form-control"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      required
                      autoComplete="off"
                      placeholder="Last name"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="firstname">First name</label>
                    <input
                      type="text"
                      name="firstname"
                      value={firstName}
                      className="form-control"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      required
                      autoComplete="off"
                      placeholder="First name"
                    />
                  </div>
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
                      placeholder="Username"
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
                  <div className="form-group mb-3">
                    <label htmlFor="confpassword">Re-type password</label>
                    <input
                      type="password"
                      name="confpassword"
                      value={passwordVerify}
                      className="form-control"
                      onChange={(e) => {
                        setPasswordVerify(e.target.value);
                      }}
                      required
                      autoComplete="off"
                      placeholder="password"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="type">You are a</label>
                    <select
                      className="form-control"
                      onChange={(e) => setType(e.target.value)}
                      value={type}
                    >
                      <option value="Parent">Parent</option>
                      <option value="Coach">Coach</option>
                      <option value="Member">Member</option>
                    </select>
                  </div>

                  <div className="form-group mb-3 d-flex justify-content-between">
                    <button className="btn btn-info " type="submit">
                      Sign up
                    </button>
                    <span className="mt-3">
                      Have an account?{" "}
                      <Link to="/sign-in" className="text-decoration-none">
                        Sign in
                      </Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
