import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

const PendingSessions = () => {
  const [loading, setLoading] = useState(true);
  const [pendingList, setPendingList] = useState([]);

  useEffect(() => {
    getPendingSessions();
  }, []);
  const getPendingSessions = async () => {
    await axios
      .get(
        `http://${import.meta.env.VITE_SERVER_API_URL}:${
          import.meta.env.VITE_SERVER_PORT
        }/member/getconfirmed`
      )
      .then((res) => {
        if (res.status === 200) {
          setPendingList(res.data);
        }
        setLoading(false);
      });
  };

  const confirmSession = async (e, id) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        `http://${import.meta.env.VITE_SERVER_API_URL}:${
          import.meta.env.VITE_SERVER_PORT
        }/member/participate/${id}`
      );
      if (result.status === 200) {
        swal("Success!", result.data.message, "success");
        getPendingSessions();
      }
    } catch (error) {
      swal("Ooops!", "Error while confirming", "error");
      console.log(error);
    }
  };

  let pendingsessions_HTML_TABLE = "";
  if (loading) {
    return <h4>Loading data...</h4>;
  } else {
    pendingsessions_HTML_TABLE = pendingList.map((item, index) => {
      item.date = item.date.slice(0, 16).split("T").join(" ");
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.date}</td>
          <td>{item.adminUname}</td>
          <td>{item.coachUname}</td>
          <td>
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={(e) => confirmSession(e, item._id)}
            >
              Confirm
            </button>
          </td>
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
        All sessions
      </h1>
      <div>
        <div className="container px-4">
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Responsible Admin</th>
                  <th>Responsible Coach</th>
                  <th>Confirmation</th>
                </tr>
              </thead>
              <tbody>{pendingsessions_HTML_TABLE}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingSessions;
