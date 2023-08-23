import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Kids = () => {
  const [listKids, setListKids] = useState([]);

  useEffect(() => {
    getKids();
  }, []);
  const getKids = async () => {
    const result = await axios.get("http://localhost:3001/kid");
    if (result.status === 200) {
      setListKids(result.data);
    }
  };

  const onDeleteKid = async (id) => {
    if (window.confirm("Are you sure that you want to delete this kid")) {
      const result = await axios.delete(
        `http://localhost:3001/kid/delete/${id}`
      );
      if (result.status === 200) {
        toast.success("Deleted successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getKids();
      }
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1
        style={{
          marginTop: "100px",
          marginLeft: "250px",
        }}
      >
        Your kids
      </h1>
      <div>
        <div className="container px-4">
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Image</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Date Of Birth</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {listKids &&
                  listKids.map((item, index) => {
                    const base64String = btoa(
                      String.fromCharCode(
                        ...new Uint8Array(item.info.data.data)
                      )
                    );
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <img
                            src={`data:image/png;base64,${base64String}`}
                            alt="....."
                            className="img-thumbnail"
                            style={{ width: "40px" }}
                          />
                        </td>
                        <td>{item.firstName}</td>
                        <td>
                          {item.lastName[0].toUpperCase() +
                            item.lastName.substring(1)}
                        </td>
                        <td>{item.dateOfBirth.substring(0, 10)}</td>
                        <td>
                          <Link to={`/update/${item._id}`}>
                            <button className="btn btn-warning btn-sm">
                              Edit
                            </button>
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => onDeleteKid(item._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kids;
