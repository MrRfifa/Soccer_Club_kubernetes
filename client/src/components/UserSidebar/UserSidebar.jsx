import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FiLogOut } from "react-icons/fi";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

const UserSidebar = ({ username, UserSidebarData }) => {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();
  async function logOut() {
    await axios.get("http://localhost:3001/auth/logout");
    await getLoggedIn();
    history("/");
  }
  const [isHovering, setIsHovering] = useState(false);

  const buttonMouseEnter = () => {
    setIsHovering(true);
  };

  const buttonMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <div>
      <nav className="navbar bg-success fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Welcome <strong> {username} </strong>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end bg-success"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                {UserSidebarData.map((item, index) => {
                  return (
                    <li key={index} className="nav-item">
                      <Link className="nav-link  fs-5" to={item.path}>
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}

                <Button
                  variant="contained"
                  endIcon={<FiLogOut />}
                  onClick={logOut}
                  style={{
                    borderRadius: 20,
                    padding: "15px 20px",
                    fontSize: "18px",
                    marginLeft: "20px",
                    marginTop: "300px",
                    backgroundColor: isHovering ? "#060b26" : "#010606",
                  }}
                  onMouseEnter={buttonMouseEnter}
                  onMouseLeave={buttonMouseLeave}
                >
                  Logout
                </Button>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserSidebar;
