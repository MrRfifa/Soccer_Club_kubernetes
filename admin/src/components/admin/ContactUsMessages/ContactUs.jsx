import React from "react";
import AnonymousMessages from "./AnonymousMessages";
import IdentifiedMessages from "./IdentifiedMessages";

const ContactUs = () => {
  return (
    <div className="container-fluid px-4 mt-4">
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active "
            id="not-logged-in-tab"
            data-bs-toggle="pill"
            data-bs-target="#not-logged-in"
            type="button"
            role="tab"
            aria-controls="not-logged-in"
            aria-selected="true"
          >
            Not logged in users
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link "
            id="logged-in-tab"
            data-bs-toggle="pill"
            data-bs-target="#logged-in"
            type="button"
            role="tab"
            aria-controls="logged-in"
            aria-selected="false"
          >
            Logged in users
          </button>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="not-logged-in"
          role="tabpanel"
          aria-labelledby="not-logged-in-tab"
          tabIndex="0"
        >
          <AnonymousMessages />
        </div>
        <div
          className="tab-pane fade"
          id="logged-in"
          role="tabpanel"
          aria-labelledby="logged-in-tab"
          tabIndex="0"
        >
          <IdentifiedMessages />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
