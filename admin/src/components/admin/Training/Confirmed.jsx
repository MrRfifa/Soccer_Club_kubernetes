import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Confirmed = () => {
  const [loading, setLoading] = useState(true);
  const [confirmedList, setConfirmedList] = useState([]);

  useEffect(() => {
    getConfirmedSessions();
  }, []);
  const getConfirmedSessions = async () => {
    await axios.get("http://localhost:3001/admin/getconfirmed").then((res) => {
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
      item.date = item.date
        .slice(0, 16)
        .split("T")
        .join(" ");
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.date}</td>
          <td>{item.adminUname}</td>
          <td>{item.coachUname}</td>
          <td>
            <Link
              to={`edit-session/${item._id}`}
              className="btn btn-outline-warning btn-sm"
            >
              Edit
            </Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="container px-4">
      <div className="card-body">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Admin Username</th>
              <th>Coach Username</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{confirmedsessions_HTML_TABLE}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Confirmed;
