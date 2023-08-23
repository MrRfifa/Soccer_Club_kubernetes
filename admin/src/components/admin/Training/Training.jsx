import React from "react";
import Canceled from "./Canceled";
import Pending from "./Pending";
import Confirmed from "./Confirmed";
import Add from "./Add";
import Done from "./Done";

const AddTraining = () => {
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Training session</h1>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#addtraining-tab-pane"
            type="button"
            role="tab"
            aria-controls="addtraining-tab-pane"
            aria-selected="true"
          >
            Add session
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="confirmed-tab"
            data-bs-toggle="tab"
            data-bs-target="#confirmedsessions-tab-pane"
            type="button"
            role="tab"
            aria-controls="confirmedsessions-tab-pane"
            aria-selected="false"
          >
            Confirmed sessions
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="done-tab"
            data-bs-toggle="tab"
            data-bs-target="#donesessions-tab-pane"
            type="button"
            role="tab"
            aria-controls="donesessions-tab-pane"
            aria-selected="false"
          >
            Done sessions
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pending-tab"
            data-bs-toggle="tab"
            data-bs-target="#pendingsessions-tab-pane"
            type="button"
            role="tab"
            aria-controls="pendingsessions-tab-pane"
            aria-selected="false"
          >
            Pending session
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="canceled-tab"
            data-bs-toggle="tab"
            data-bs-target="#canceledsessions-tab-pane"
            type="button"
            role="tab"
            aria-controls="canceledsessions-tab-pane"
            aria-selected="false"
          >
            Canceled sessions
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active card-body border"
          id="addtraining-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabIndex="0"
        >
          <Add />
        </div>
        <div
          className="tab-pane fade card-body border"
          id="confirmedsessions-tab-pane"
          role="tabpanel"
          aria-labelledby="confirmed-tab"
          tabIndex="0"
        >
          <Confirmed />
        </div>
        <div
          className="tab-pane fade card-body border"
          id="donesessions-tab-pane"
          role="tabpanel"
          aria-labelledby="done-tab"
          tabIndex="0"
        >
          <Done />
        </div>
        <div
          className="tab-pane fade card-body border"
          id="pendingsessions-tab-pane"
          role="tabpanel"
          aria-labelledby="pending-tab"
          tabIndex="0"
        >
          <Pending />
        </div>
        <div
          className="tab-pane fade card-body border"
          id="canceledsessions-tab-pane"
          role="tabpanel"
          aria-labelledby="canceled-tab"
          tabIndex="0"
        >
          <Canceled />
        </div>
      </div>
    </div>
  );
};

export default AddTraining;
