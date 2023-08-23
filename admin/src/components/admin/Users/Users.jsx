import React from "react";
import Parents from "./Parents";
import Members from "./Members";
import Coaches from "./Coaches";
import Admins from "./Admins";

const Users = () => {
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Users</h1>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#admins-tab-pane"
            type="button"
            role="tab"
            aria-controls="admins-tab-pane"
            aria-selected="true"
          >
            Admins
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="confirmed-tab"
            data-bs-toggle="tab"
            data-bs-target="#parents-tab-pane"
            type="button"
            role="tab"
            aria-controls="parents-tab-pane"
            aria-selected="false"
          >
            Parents
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pending-tab"
            data-bs-toggle="tab"
            data-bs-target="#coaches-tab-pane"
            type="button"
            role="tab"
            aria-controls="coaches-tab-pane"
            aria-selected="false"
          >
            Coaches
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="canceled-tab"
            data-bs-toggle="tab"
            data-bs-target="#members-tab-pane"
            type="button"
            role="tab"
            aria-controls="members-tab-pane"
            aria-selected="false"
          >
            Members
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active card-body border"
          id="admins-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabIndex="0"
        >
          <Admins />
        </div>
        <div
          className="tab-pane fade card-body border"
          id="parents-tab-pane"
          role="tabpanel"
          aria-labelledby="parents-tab"
          tabIndex="0"
        >
          <Parents />
        </div>
        <div
          className="tab-pane fade card-body border"
          id="coaches-tab-pane"
          role="tabpanel"
          aria-labelledby="coaches-tab"
          tabIndex="0"
        >
          <Coaches />
        </div>
        <div
          className="tab-pane fade card-body border"
          id="members-tab-pane"
          role="tabpanel"
          aria-labelledby="members-tab"
          tabIndex="0"
        >
          <Members />
        </div>
      </div>
    </div>
  );
};

export default Users;
