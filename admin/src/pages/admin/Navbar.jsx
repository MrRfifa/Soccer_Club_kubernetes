import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const history = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);
  const logout = async (e) => {
    e.preventDefault();
    const result = await axios.get(
      `http://${import.meta.env.VITE_SERVER_API_URL}:${
        import.meta.env.VITE_SERVER_PORT
      }/admin/logoutadmin`
    );
    await getLoggedIn();
    history("/");
    swal("Success!", result.data.message, "success");
  };
  getLoggedIn();
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand ps-3" to="/admin/dashboard">
          Administration
        </Link>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                type="button"
                className="nav-link btn btn-danger btn-sm text-white"
                // style={{ marginLeft: "1100px" }}
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </ul>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
