import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Canceled = () => {
  const [loading, setLoading] = useState(true);
  const [canceledList, setCanceledList] = useState([]);

  useEffect(() => {
    getCanceledSessions();
  }, []);
  const getCanceledSessions = async () => {
    await axios.get(`http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/admin/getcanceled`).then((res) => {
      if (res.status === 200) {
        setCanceledList(res.data);
      }
      setLoading(false);
    });
  };
  const deleteSession = async (e, id) => {
    e.preventDefault();
    try {
      if (window.confirm("Are you sure that you want to delete this session")) {
        const result = await axios.delete(
          `http://localhost:3001/admin/delete-non-confirmed/${id}`
        );
        if (result.status === 200) {
          swal("Success!", result.data.message, "success");
          getCanceledSessions();
        }
      }
    } catch (error) {
      swal("Ooops!", "Error while deleting", "error");
      console.log(error);
    }
  };

  let canceledsessions_HTML_TABLE = "";
  if (loading) {
    return <h4>Loading data...</h4>;
  } else {
    canceledsessions_HTML_TABLE = canceledList.map((item, index) => {
      item.date = item.date
        .slice(0, 16)
        .split("T")
        .join(" ");
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.date}</td>
          <td>{item.adminUname}</td>
          <td>
            <Link
              to={`edit-session/${item._id}`}
              className="btn btn-outline-warning btn-sm"
            >
              Edit
            </Link>
          </td>
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
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{canceledsessions_HTML_TABLE}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Canceled;
