import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

const Done = () => {
  const [loading, setLoading] = useState(true);
  const [doneList, setDoneList] = useState([]);

  useEffect(() => {
    getDoneSessions();
  }, []);
  const getDoneSessions = async () => {
    await axios.get(`http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/admin/getdone`).then((res) => {
      if (res.status === 200) {
        setDoneList(res.data);
      }
      setLoading(false);
    });
  };

  const deleteSession = async (e, id) => {
    e.preventDefault();
    try {
      if (window.confirm("Are you sure that you want to delete this session")) {
        const result = await axios.delete(
          `http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/admin/delete-session/${id}`
        );
        if (result.status === 200) {
          swal("Success!", result.data.message, "success");
          getDoneSessions();
        }
      }
    } catch (error) {
      swal("Ooops!", "Error while deleting", "error");
      console.log(error);
    }
  };

  let donesessions_HTML_TABLE = "";
  if (loading) {
    return <h4>Loading data...</h4>;
  } else {
    donesessions_HTML_TABLE = doneList.map((item, index) => {
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
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={(e) => deleteSession(e, item._id)}
            >
              Delete
            </button>
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
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{donesessions_HTML_TABLE}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Done;
