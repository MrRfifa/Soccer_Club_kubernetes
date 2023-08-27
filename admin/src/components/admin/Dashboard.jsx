import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [listKids, setListKids] = useState([]);
  const [parentList, setParentsList] = useState([]);
  const [coachList, setCoachesList] = useState([]);
  const [memberList, setMembersList] = useState([]);

  useEffect(() => {
    getAll();
  }, []);
  const getAll = async () => {
    const result = await axios.get(`http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/admin/allkids`);
    if (result.status === 200) {
      setListKids(result.data);
    }
    await axios.get(`http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/admin/allparents`).then((res) => {
      if (res.status === 200) {
        setParentsList(res.data);
      }
    });
    await axios.get(`http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/admin/allmembers`).then((res) => {
      if (res.status === 200) {
        setMembersList(res.data);
      }
    });
    await axios.get(`http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/admin/allcoaches`).then((res) => {
      if (res.status === 200) {
        setCoachesList(res.data);
      }
    });
  };

  return (
    <div className="d-flex justify-content-evenly mt-5">
      <div
        className="card border-warning mb-3"
        style={{ width: "10rem", height: "6rem" }}
      >
        <div className="card-header text-warning">Parents</div>
        <div className="card-body text-warning">
          <h5 className="card-title position-absolute start-50 translate-middle fs-1 mt-2">
            {parentList.length}
          </h5>
        </div>
      </div>
      <div
        className="card border-secondary mb-3"
        style={{ width: "10rem", height: "6rem" }}
      >
        <div className="card-header text-secondary">Kids</div>
        <div className="card-body text-secondary">
          <h5 className="card-title position-absolute start-50 translate-middle fs-1 mt-2">
            {listKids.length}
          </h5>
        </div>
      </div>
      <div
        className="card border-info mb-3"
        style={{ width: "10rem", height: "6rem" }}
      >
        <div className="card-header text-info">Coaches</div>
        <div className="card-body text-info">
          <h5 className="card-title position-absolute start-50 translate-middle fs-1 mt-2">
            {coachList.length}
          </h5>
        </div>
      </div>
      <div
        className="card border-primary mb-3"
        style={{ width: "10rem", height: "6rem" }}
      >
        <div className="card-header text-primary">Members</div>
        <div className="card-body text-primary">
          <h5 className="card-title position-absolute start-50 translate-middle fs-1 mt-2">
            {memberList.length}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
