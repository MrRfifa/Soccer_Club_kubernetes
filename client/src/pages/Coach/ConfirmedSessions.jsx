import React, { useState, useEffect } from "react";
import axios from "axios";

const ConfirmedSessions = () => {
  const [loading, setLoading] = useState(true);
  const [confirmedList, setConfirmedList] = useState([]);

  useEffect(() => {
    getConfirmedSessions();
  }, []);
  const getConfirmedSessions = async () => {
    await axios.get(`http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/coach/getconfirmed`).then((res) => {
      if (res.status === 200) {
        setConfirmedList(res.data);
      }
      setLoading(false);
    });
  };

  let confirmedsessions_HTML_TABLE = "";
  if (loading) {
    return <h4>Loading data...</h4>;
  } else {
    confirmedsessions_HTML_TABLE = confirmedList.map((item, index) => {
      item.date = item.date.slice(0, 16).split("T").join(" ");
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.date}</td>
          <td>{item.adminUname}</td>
        </tr>
      );
    });
  }

  return (
    <div className="container-fluid px-4 mt-5">
      <h1
        style={{
          marginTop: "100px",
          marginLeft: "250px",
        }}
      >
        Confirmed session
      </h1>
      <div>
        <div className="container px-4">
          <div className="card-body">
            <div className="badge bg-danger text-wrap">Time zone UTC-2</div>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Responsible Admin</th>
                </tr>
              </thead>
              <tbody>{confirmedsessions_HTML_TABLE}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedSessions;
